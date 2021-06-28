# 貢献についての指針

> これは[next-typed-routesの寄稿ガイドライン](https://github.com/jagaapple/next-typed-routes/blob/master/.github/CONTRIBUTING.md)からの一部引用です。

## Gitブランチフロー

このプロジェクトの開発には、GitHub Flow を採用しています。`main`ブランチにあるものはすべてデプロイ可能です。
何か新しいことに取り組むにはブランチを作成し、その名前にはプレフィックスとして`feature/` を追加します。
ブランチ名は動詞で始まり、できるだけ簡潔でわかりやすいものにします。

```bash
# 例
feature/implement-xxx
feature/support-xxx-for-xxx
feature/fix-xxx-bugs
```

詳しくはこちらをみてください。 [GitHub Flow – Scott Chacon](http://scottchacon.com/2011/08/31/github-flow.html)

## Gitコミットメッセージ規約

Gitのコミットメッセージは、以下のフォーマットにしたがってください。

```bash
# Format
<COMMIT_TYPE>: <SUMMARY>

- <DESCRIPTION>
- <DESCRIPTION>
- <DESCRIPTION>
```

### `<COMMIT_TYPE>`

1つのコミットの目的は1つだけで、コミットメッセージの1行目の先頭に以下のようなコミットタイプを追加します。
メッセージを追加します。

| COMMIT_TYPE | 使い方                                  |
| :---------: | :----------------------------------- |
|    `feat`   | 新機能                                  |
|    `fix`    | バグ修正                                 |
|   `style`   | コードの意味に影響を与えない変更（空白、書式設定、セミコロンの欠落など） |
|    `docs`   | ドキュメントのみが変更                          |
|  `refactor` | バグを修正せず、機能を追加しないコード変更                |
|    `perf`   | パフォーマンスを向上させるコード変更                   |
|    `test`   | 不足しているテストを追加するか、既存のテストを修正            |
|   `chore`   | ビルドプロセスまたはドキュメント生成などの補助ツールとライブラリへの変更 |

```bash
# 例
feat: Implement sign up system
refactor: Rename XXXClass to YYYClass

# BAD
feat:Implement sign up system
<Feat> Implement sign up system
Feat: Implement sign up system
add: Implement sign up system
Add Implement sign up system
```

### `<SUMMARY>`

`<SUMMARY>`（概要）は変更点をまとめたもので、コミットタイプを含めて50文字以内とします。ピリオド `.` は含まないでください。
また、小文字で始めます。

```bash
# 例
feat: Implement sign up system
refactor: Rename XXXClass to YYYClass

# 悪い例
FEAT: implement sign up system
feat: Implement sign up system. Because ...
```

### `<DESCRIPTION>` (Optional)

`<DESCRIPTION>` は、そのコミットで変更された内容の説明です。大文字から始めて、1行ずつ記述します。
また、ピリオド `.` は含めないでください。

```bash
# 例
feat: Implement sign up system

- Add sign up pages
- Add sign up form styles

# 悪い例: 1行目と2行目の間に空行がない
feat: Implement sign up system
- Add sign up pages
- Add sign up form styles

# 悪い例: ピリオドが付いている
feat: Implement sign up system

- Add sign up pages.
- Add sign up form styles.

# 悪い例: 大文字で始めいない
feat: Implement sign up system

- add sign up pages
- add sign up form styles
```
