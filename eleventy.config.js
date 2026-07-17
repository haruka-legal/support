module.exports = function (eleventyConfig) {
  // 独自ドメイン（haruka-legal.com）を使うのでパスプレフィックスは "/"
  // 静的アセットをそのままコピー
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // ---- コレクション（言語ごと）--------------------------------------------

  eleventyConfig.addCollection("guidesEn", (api) =>
    api.getFilteredByGlob("src/guides/**/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("guidesEs", (api) =>
    api.getFilteredByGlob("src/es/guides/**/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("guidesJa", (api) =>
    api.getFilteredByGlob("src/ja/guides/**/*.md").sort((a, b) => b.date - a.date)
  );

  // ---- フィルタ ------------------------------------------------------------

  // 日付表示（言語別）
  eleventyConfig.addFilter("dateEn", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  );
  eleventyConfig.addFilter("dateEs", (d) =>
    new Date(d).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  );
  eleventyConfig.addFilter("dateJa", (d) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`;
  });

  // ISO 8601（構造化データ・sitemap用）
  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString());

  // タグ名で記事を絞り込み
  eleventyConfig.addFilter("byTag", (articles, tag) =>
    articles.filter((a) => (a.data.tags || []).includes(tag))
  );

  // 関連記事: 共有タグ1つにつき +1点 → 上位3件（同一言語コレクション内で使う）
  eleventyConfig.addFilter("related", (articles, current, limit = 3) => {
    const curTags = new Set(current.data.tags || []);
    return articles
      .filter((a) => a.url !== current.url)
      .map((a) => {
        let score = 0;
        (a.data.tags || []).forEach((t) => { if (curTags.has(t)) score += 1; });
        return { item: a, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score || y.item.date - x.item.date)
      .slice(0, limit)
      .map((x) => x.item);
  });

  // 先頭 n 件
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // 記事本文から説明文を自動生成（description未指定時の保険）
  eleventyConfig.addFilter("excerpt", (content, len = 140) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return text.length > len ? text.slice(0, len) + "…" : text;
  });

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
