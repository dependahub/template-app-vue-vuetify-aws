# template-app-vue-vuetify-aws

AWS用Vue.js + Vuetify SPAテンプレート

<img width="1205" height="757" alt="スクリーンショット 2025-10-15 12 13 01" src="https://github.com/user-attachments/assets/636c4cd4-c18b-424e-a46b-3e82a5e33483" />

## 📖 概要

このプロジェクトは、Vue.js 3、Vuetify 3、AWS Amplifyを使用したモダンなシングルページアプリケーション（SPA）テンプレートです。AWS SAM（Serverless Application Model）を使用してバックエンドをデプロイし、認証機能やファイルストレージなどのフル機能を備えたWebアプリケーションを迅速に構築できます。

## ✨ 主な機能

- **Vue.js 3** - Composition APIを使用した最新のフロントエンドフレームワーク
- **Vuetify 3** - マテリアルデザインコンポーネントライブラリ
- **Vite** - 高速な開発サーバーとビルドツール
- **AWS Cognito** - ユーザー認証とアクセス管理
- **AWS API Gateway** - RESTful APIエンドポイント
- **AWS Lambda** - サーバーレスバックエンド関数
- **AWS S3** - ユーザーファイルストレージ
- **TypeScript型定義** - 型安全性の向上

## 🛠 技術スタック

### フロントエンド
- Vue.js 3.5.x
- Vuetify 3.10.x
- Vue Router 4.5.x
- AWS Amplify 6.15.x
- Vite 7.0.x

### バックエンド
- Node.js 22.x（またはNode.js 20.19.0以上）
- AWS Lambda（ARM64アーキテクチャ）
- AWS SAM (Serverless Application Model)
- API Gateway REST API

### AWSサービス
- **認証**: Amazon Cognito（ユーザープール、IDプール）
- **API**: API Gateway + Lambda
- **ストレージ**: Amazon S3
- **IaM**: 認証済み/未認証ロール

## 📋 前提条件

開発を始める前に、以下がインストールされていることを確認してください：

- **Node.js**: バージョン20.19.0以上または22.12.0以上
- **npm**: Node.jsに付属（推奨バージョン: 9.x以上）
- **AWS CLI**: [AWS CLIインストールガイド](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **AWS SAM CLI**: [AWS SAM CLIインストールガイド](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- **AWSアカウント**: デプロイに必要
- **Cognitoユーザープール**: 既存のユーザープールIDが必要

## 🚀 インストール

### 1. リポジトリのクローン

```bash
git clone https://github.com/dependahub/template-app-vue-vuetify-aws.git
cd template-app-vue-vuetify-aws
```

### 2. 依存関係のインストール

```bash
npm install
```

このコマンドは、ルートプロジェクトとワークスペース（api）の依存関係をすべてインストールします。

## 💻 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションを確認できます。ホットモジュールリプレースメント（HMR）が有効になっているため、コード変更は即座に反映されます。

### 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動（ポート5173） |
| `npm run build` | 本番用にアプリケーションをビルド |
| `npm run preview` | ビルドしたアプリケーションをプレビュー |
| `npm run lint` | ESLintでコードをチェックし、自動修正 |
| `npm run format` | Prettierでコードをフォーマット |
| `npm run build:sdk` | AWS Amplify SDKの型定義を生成 |
| `npm run build:config` | Amplify設定ファイルを生成 |

### APIの開発とテスト

APIディレクトリで作業する場合：

```bash
cd api
npm test
```

これにより、XO（リンター）とAva（テストランナー）が実行されます。

## 📁 プロジェクト構造

```
template-app-vue-vuetify-aws/
├── api/                          # バックエンドAPI（Lambda関数）
│   ├── src/
│   │   ├── actions/             # APIアクション
│   │   │   ├── auth/            # 認証済みユーザー向けアクション
│   │   │   └── unauthenticated/ # 未認証ユーザー向けアクション
│   │   ├── middlewares/         # Lambdaミドルウェア
│   │   ├── utils/               # ユーティリティ関数
│   │   └── index.js            # Lambdaハンドラー
│   └── package.json
│
├── src/                         # フロントエンドソースコード
│   ├── App.vue                  # ルートVueコンポーネント
│   ├── main.js                  # アプリケーションエントリーポイント
│   ├── plugins/                 # Vueプラグイン（Vuetifyなど）
│   ├── router/                  # Vue Routerの設定
│   ├── sdk/                     # 生成されたAWS SDK
│   └── styles/                  # グローバルスタイル
│
├── scripts/                     # ビルドスクリプト
│   ├── build-sdk/              # SDK生成スクリプト
│   └── build-amplifyconfiguration.js
│
├── public/                      # 静的アセット
├── @types/                      # TypeScript型定義
├── template.yaml               # AWS SAMテンプレート
├── samconfig.toml              # SAM設定ファイル
├── vite.config.js              # Vite設定
├── package.json                # プロジェクトの依存関係
└── README.md                   # このファイル
```

## ☁️ AWSへのデプロイ

### 1. SAM設定の更新

`samconfig.toml`を編集して、デプロイ設定をカスタマイズします：

```toml
[default.deploy.parameters]
stack_name = "your-stack-name"
region = "ap-northeast-1"
parameter_overrides = [
    "Env=\"dev\"",
    "UserPoolId=\"your-cognito-userpool-id\"",
]
```

**重要**: 既存のCognitoユーザープールIDを指定する必要があります。

### 2. SAMビルド

```bash
sam build
```

### 3. SAMデプロイ

```bash
sam deploy
```

初回デプロイの場合、ガイド付きデプロイを使用できます：

```bash
sam deploy --guided
```

### 4. Amplify設定の生成

デプロイ後、CloudFormationのOutputsから以下の値を取得し、設定ファイルを生成します：

```bash
npm run build:config
```

これにより、Amplifyが使用する設定ファイルが生成されます。

## 🔧 設定

### Amplify設定

アプリケーションは、以下のAWSリソースを使用します：

- **Cognito User Pool**: ユーザー認証
- **Cognito Identity Pool**: AWSリソースへのアクセス
- **API Gateway**: RESTful APIエンドポイント
- **S3 Bucket**: ユーザーファイルストレージ

これらのリソースは`template.yaml`で定義され、SAMによってデプロイされます。

### 環境変数

必要に応じて、以下の環境変数を設定できます：

- `ENV`: 環境名（dev、staging、prodなど）
- `REGION`: AWSリージョン
- `USERPOOLID`: Cognitoユーザープール ID
- `USERBUCKET`: S3バケット名

## 🔐 認証とセキュリティ

### 認証フロー

1. ユーザーはCognitoユーザープールで認証
2. 認証後、Cognito IDプールから一時的なAWS認証情報を取得
3. これらの認証情報を使用してAPI GatewayとS3にアクセス

### IAMロール

- **AuthRole**: 認証済みユーザー用（APIとプライベートS3アクセス）
- **UnauthRole**: 未認証ユーザー用（限定的なAPIアクセス）

### APIエンドポイント

- `/auth/*`: 認証が必要なエンドポイント
- `/unauth/*`: 認証不要の公開エンドポイント

## 🧪 テスト

### フロントエンドのテスト

現在、フロントエンドのテストは構成されていません。必要に応じてVitest等を追加できます。

### バックエンドのテスト

APIディレクトリでテストを実行：

```bash
cd api
npm test
```

これにより、XO（リンター）とAva（テストランナー）が実行されます。

## 🎨 コードスタイル

プロジェクトは以下のツールを使用してコード品質を維持します：

- **ESLint**: JavaScriptとVueファイルのリンティング
- **Prettier**: コードフォーマット
- **XO**: APIコードのリンティング

コードをフォーマットするには：

```bash
npm run format  # Prettierでフォーマット
npm run lint    # ESLintで検証と自動修正
```

## 📦 ビルドと本番環境

### 本番ビルド

```bash
npm run build
```

ビルドされたファイルは`dist/`ディレクトリに出力されます。

### プレビュー

ビルド後、ローカルでプレビューできます：

```bash
npm run preview
```

### デプロイ

ビルドしたファイルをAWS AmplifyホスティングやS3 + CloudFrontにデプロイできます。

## 🤝 コントリビューション

コントリビューションを歓迎します！以下の手順に従ってください：

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🔗 関連リンク

- [Vue.js 公式ドキュメント](https://ja.vuejs.org/)
- [Vuetify 公式ドキュメント](https://vuetifyjs.com/)
- [AWS Amplify ドキュメント](https://docs.amplify.aws/)
- [AWS SAM ドキュメント](https://docs.aws.amazon.com/serverless-application-model/)
- [Vite ドキュメント](https://ja.vitejs.dev/)

## 📞 サポート

問題が発生した場合は、[GitHubのIssue](https://github.com/dependahub/template-app-vue-vuetify-aws/issues)で報告してください。

---

Made with ❤️ by DependaHub
