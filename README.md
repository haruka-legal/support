# HARUKA LEGAL SUPPORT — サイト運用ガイド

外国人向け(EN/ES/JA)サイト。Eleventy（静的サイトジェネレーター）+ GitHub Pages 構成。宇宙海事レビュー(space)サイトと同じ思想。

**旧構成との違い**: 以前は`index.html` 1ファイルに3言語(`data-lang`属性)を詰め込む方式でした。今回から**言語ごとに別URL**（EN: `/`、ES: `/es/`、JA: `/ja/`）に変更しています。hreflangタグで相互リンクされ、検索エンジン・AIにも言語ごとに正しく認識されます。

## 公開前に必ずやること

1. `src/_data/site.json` の `line` ・ `whatsapp` を実際のURLに変更（今は仮の値）
2. トップページの内容（料金・ケース説明・代表挨拶）を最終確認。既存index.htmlから自動抽出したものなので、抜け漏れがないか一度目視で確認推奨
3. 行政書士登録が完了してから公開すること

## 記事（Guides）の書き方

1. 英語: `src/guides/` にMarkdownを追加（ファイル名は英語スラッグ）
2. スペイン語: `src/es/guides/`、日本語: `src/ja/guides/` に同様に追加
3. front matter:
   - `layout: layouts/guide.njk`
   - `lang`: `en` / `es` / `ja`
   - `tags`: 自由に複数（関連記事の紐付けに使用）
   - `faq`: 書くとFAQPage構造化データが自動で付く
   - `altUrls`: 他言語版のURL（翻訳できていない場合は自分自身のURLでOK）
4. `main` ブランチにpushすると自動でビルド・公開されます（GitHub Actions）

3言語すべて揃える必要はありません。英語だけ先に出して、後からES/JAを追加する運用でOKです。

## ローカルでの確認

```
npm install        # 初回のみ
npm run serve      # http://localhost:8080 でプレビュー
```

## GitHubへのアップ手順（既存リポジトリの入れ替え）

既存の `haruka-legal/support` リポジトリの中身を、このフォルダの中身に**丸ごと置き換えます**。

1. 既存リポジトリの `index.html` ・ `logo.jpg` ・ `profile-1.jpg` ・ `profile-2.jpg` ・ `qr-line.png` ・ `qr-whatsapp.png` を削除
2. このフォルダの中身を全部リポジトリ直下にアップロード
   - **`.github` フォルダ（自動デプロイ設定）・`.gitignore` を忘れずに。** 隠しファイルなのでWeb画面のドラッグ&ドロップだと漏れやすいので注意。GitHub Desktopを使うか、Web画面の「Add file → Upload files」に該当フォルダごとドラッグする
   - `node_modules` と `_site` はアップ不要
3. リポジトリの Settings → Pages → Source を「**GitHub Actions**」に変更（今は「Deploy from a branch」になっているはず）
4. 1〜2分でビルドが走り、独自ドメイン（haruka-legal.com）で公開される

## 自動生成されるもの

- `/sitemap.xml` — 全ページ・全言語のサイトマップ
- `/feed.xml` — 英語Guidesの RSS（新着20件）
- `/llms.txt` — AI検索エンジン向けのサイト説明
- `/robots.txt`
- 各記事: Article / FAQPage（faq記入時）のJSON-LD
- hreflangタグ（EN/ES/JA相互リンク）

## 画像を使うときの軽量化ルール

- 画像は `src/assets/images/` に置き、幅1200px以下・WebP形式・1枚200KB以下を目安に
- base64埋め込みは禁止（旧サイトで83%削減した教訓のとおり）
