# Azure サーバーレス アプリケーション （シンプル版）

本家のドキュメントには
[Azure 上のサーバーレス Web アプリケーションの作成](https://docs.microsoft.com/ja-jp/azure/architecture/reference-architectures/serverless/web-app)
に関する詳細な記載がありますが、
カスタムドメインの適用やセキュリティのために CDN や API Management を使用したアーキテクチャになっており、最小構成としては若干オーバースペックかなというところで、
最もシンプルに実装した場合のサンプルを作成してみました。

![overview](./images/overview.png)

[Azure Storage の静的 Web サイト ホスティング](https://docs.microsoft.com/ja-jp/azure/storage/blobs/storage-blob-static-website) 
を使用して提供する SPA ： Sinble Page Web Application が
OAuth 2.0 で策定されている [Implicit Grant Flow](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) を使用して
[Azure Active Directory](https://docs.microsoft.com/ja-jp/azure/active-directory/) にサインイン、
さらに [Azure Functions](https://docs.microsoft.com/ja-jp/azure/azure-functions/) で実装された Web API を呼び出すサンプルになっています。
Implicit Grant Flow の実装部分には
[Microsoft Authentication Library (MSAL) for JS](https://github.com/AzureAD/microsoft-authentication-library-for-js)
を使用しています。

# プラットフォームの構築

サンプルの実行環境としては以下が必要になります。
- SPA をホストする Storage Account
- Web API を提供する Functions
- 上記２つを表す Azure Active Directory のアプリケーション

## SPA の構成

### Azure Storage の作成

Azure Portal の Marketplace から
[Storage Account](https://portal.azure.com/#create/Microsoft.StorageAccount-ARM)
を作成します。
その際に以下のパラメタを入力してください（それ以外は任意）

- パフォーマンス : Standard
- アカウントの種類 : StorageV2
- レプリケーション : ローカル冗長ストレージ（LRS）

### 静的 Web ホスティングの有効化

ストレージアカウントが作成できたら静的 Web ホスティング機能を有効にします。

![static web site hosting](./images/blob-static-websites.png)

`$web` という名前の Blob コンテナが作成され、そこに配置された各種のコンテンツ（html/js/css/etc...）が上図の `プライマリエンドポイント` から提供できる様になります。

### Azure AD アプリケーションとして登録

作成した SPA でユーザーのサインインを行うために Azure AD にアプリケーションとして登録します。

![register static web site as application](./images/blob-register-app.png)

- サポートされているアカウントの種類 : この組織ディレクトリのみに含まれるアカウント (シングル テナント)
- リダイレクト URI
    - 種類 ：　Web
    - URI　：　静的 Web サイトホスティングで作成された プライマリエンドポイント

![registered application](./images/blob-register-app-2.png)

登録が完了すると GUID 形式のアプリケーション ID が生成されていますので、この値を控えておきます。
同じ画面でアプリケーションが登録された Azure AD テナントの ID も表示されていますので、こちらの値も控えておきます。

## Web API の構成




