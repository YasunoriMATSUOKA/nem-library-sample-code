# nem-library-sample-code

NEM, NIS1 の SDK の nem-library のサンプルコード集です.

## 0. 環境構築

### 0-1. Node.js(npm 含む)のインストール

もし未インストールであれば, 以下リンクからインストールしてください.

バージョンは特にこだわりが無ければ推奨版で良いでしょう。

[https://nodejs.org/ja/](https://nodejs.org/ja/)

インストールの完了は, 以下コマンドで, Node.js, npm のバージョンが表示されることで確認してください.

Node.js のバージョン確認

```sh
node -v
```

npm のバージョン確認

```sh
npm -v
```

### 0-2. TypeScript, ts-node のインストール

本レポジトリのサンプルコードは, TypeScript で記述し, ts-node で実行します.

以下コマンドでインストールしてください。

```sh
npm install -g typescript ts-node
```

### 0.3. プロジェクトのディレクトリの作成

`nem-library-sample-code`というディレクトリを適当な場所に作成してください.

### 0.4. プロジェクトの初期化

Visual Studio Code 等のエディタで 0.3 で作成したディレクトリを開き, ターミナルを表示させ, 以下コマンドを実行してください.

問いかけに対しては, 特にこだわりがなければ, 全てそのまま Enter でデフォルトの値を選べば良いでしょう.

```sh
npm init
```

完了後, ディレクトリ内は以下のような構成になっているでしょう.

```sh
nem-library-sample-code
 |----LICENSE
 |----package.json
```

この後サンプルコードを記述していくにあたり, 以下のようにディレクトリを作成しておきます.

```sh
nem-library-sample-code
 |----src <- new
 |     |----config <- new
 |     |----example <- new
 |----LICENSE
 |----package.json
```

### 0-4. nem-library, rxjs のインストール

nem-library, rxjs を以下コマンドでインストールしてください.

rxjs をインストールするのは, nem-library が内部的に rxjs を使用しているためです.

```sh
npm install rxjs nem-library
```

必要あれば以下の GitHub や公式ドキュメント等も参考にしてください.

- nem-library

  - 公式ドキュメント [https://nemproject.github.io/nem-library-docs/](https://nemproject.github.io/nem-library-docs/)
  - GitHub [https://github.com/NemProject/nem-library-ts](https://github.com/NemProject/nem-library-ts)

- rxjs
  - 公式ドキュメント [https://rxjs-dev.firebaseapp.com/guide/overview](https://rxjs-dev.firebaseapp.com/guide/overview)

これで準備が整いました!

## 1. nem-library 最初の一歩

NEM, NIS1 では, ブロックチェーンのノードから情報を取得するには REST-API と WebSocket の 2 種類の仕組みがあります.

本レポジトリのサンプルコードでは, EtherSecurity 様にて運用頂いている以下 URL のリストのノードを使用させて頂きます. この場を借りて感謝申し上げます.

[https://github.com/ethersecurity/nodes/blob/master/nem/nodes.txt](https://github.com/ethersecurity/nodes/blob/master/nem/nodes.txt)

なお, サンプルコードで使用しているアドレスは, 本レポジトリオーナーの個人的なアドレスです. 必要に応じて適切なアドレスでお試しください.

[NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M](https://explorer.nemtool.com/#/s_account?account=NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M)

### 1-1. REST-API で特定のアドレスのアカウント情報を特定のノードから取得

まず`nem-library-sample-code/src/example/1-1`ディレクトリを作成します.

次に`nem-library-sample-code/src/example/1-1/getAccountInfoWithMetaDataFromAddress.ts`の位置, ファイル名でファイルを作成し, まずは基本となるモジュールを以下のように読み込みます.

```typescript
import { NEMLibrary } from "nem-library";
```

次にモジュールをメインネットの設定で初期化します.

```typescript
import { NEMLibrary, NetworkTypes } from "nem-library";
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
```

ノードとして, `https://aqualife1.supernode.me:7891`を使用させて頂く場合の説明です. `ServerConfig`という型のノード接続設定情報を以下のように定義します.

```typescript
import { NEMLibrary, NetworkTypes, ServerConfig } from "nem-library";
/* コメントアウトした箇所は変化なし
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
*/
const nodeProtocol = "https";
const nodeDomain = "aqualife1.supernode.me";
const nodePort = 7891;
const serverConfigs: ServerConfig[] = [
  {
    protocol: nodeProtocol,
    domain: nodeDomain,
    port: nodePort,
  },
];
```

ここではアカウント情報を取得するため, アカウント情報をノードに REST-API で問い合わせて取得するための`AccountHttp`という型のオブジェクトを作成します.

```typescript
import {
  NEMLibrary,
  NetworkTypes,
  ServerConfig,
  AccountHttp,
} from "nem-library";
/*  コメントアウトした箇所は変化なし
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
const nodeProtocol = "https";
const nodeDomain = "aqualife1.supernode.me";
const nodePort = 7891;
const serverConfigs: ServerConfig[] = [
  {
    protocol: nodeProtocol,
    domain: nodeDomain,
    port: nodePort,
  },
];
*/
const accountHttp = new AccountHttp(serverConfigs);
```

アドレス`NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M`のアカウント情報を取得するため, `Address`という型のオブジェクトを作成します.

```typescript
import {
  NEMLibrary,
  NetworkTypes,
  ServerConfig,
  AccountHttp,
  Address,
} from "nem-library";
/*  コメントアウトした箇所は変化なし
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
const nodeProtocol = "https";
const nodeDomain = "aqualife1.supernode.me";
const nodePort = 7891;
const serverConfigs: ServerConfig[] = [
  {
    protocol: nodeProtocol,
    domain: nodeDomain,
    port: nodePort,
  },
];
const accountHttp = new AccountHttp(serverConfigs);
*/
const addressString = "NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M";
const address = new Address(addressString);
```

いよいよノードからアドレスの情報を取得します.

`accountHttp.getFrom(address).subscribe(successCallbackFunction(response), errorCallbackFunction(error), completeCallbackFunction());`と記載することで, 正常なレスポンスが流れてきたら`successCallbackFunction`関数が response を引数で受取って呼ばれ, エラーが返ってきたら`errorCallbackFunction`関数が error を引数で受取って呼ばれ, REST-API の通信が終わってこれ以上何も流れてこなくなったら`completeCallbackFunction`関数が呼ばれるという流れです.

```typescript
/* コメントアウトした箇所は変化なし
import {
  NEMLibrary,
  NetworkTypes,
  ServerConfig,
  AccountHttp,
  Address,
} from "nem-library";
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
const nodeProtocol = "https";
const nodeDomain = "aqualife1.supernode.me";
const nodePort = 7891;
const serverConfigs: ServerConfig[] = [
  {
    protocol: nodeProtocol,
    domain: nodeDomain,
    port: nodePort,
  },
];
const accountHttp = new AccountHttp(serverConfigs);
const addressString = "NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M";
const address = new Address(addressString);
*/
accountHttp.getFromAddress(address).subscribe(
  (x) => {
    console.log(x);
  },
  (error) => {
    console.log(error);
  },
  () => {
    console.log("completed!");
  }
);
```

それでは作成したプログラムをターミナルで実行してみましょう!

以下コマンドを実行してください.

```sh
ts-node ./src/example/1-1/getAccountInfoWithMetaDataFromAddress.ts
```

以下のような結果が得られたら成功です!

```sh
AccountInfoWithMetaData {
  balance: Balance {
    balance: 2636145057,
    vestedBalance: 2636091909,
    unvestedBalance: 53148
  },
  importance: 0,
  publicAccount: PublicAccount {
    address: Address {
      value: 'NAX3EP4EKUMLH4T3N7GJSTQDG2AMUK5T26P5EA2M',
      networkType: 104
    },
    publicKey: '051beb2871a4dad21bb8b241a49837442a46a5628fc0c3951ae322121508a4a1'
  },
  harvestedBlocks: 0,
  cosignatoriesCount: undefined,
  minCosignatories: undefined,
  status: 'LOCKED',
  remoteStatus: 'INACTIVE',
  cosignatoryOf: [],
  cosignatories: []
}
completed!
```

REST-API でノードから取得できるブロックチェーンの情報は他にも様々ですが, 基本的にはここで説明した流れと同様となります.

以下の基本的な流れを覚えておくと応用が効くと思います.

1. nem-library の必要なモジュールをインポート
2. bootstrap で初期化(ここでメインネット, テストネット等選択)
3. ノード接続設定を反映した REST-API 接続用オブジェクトを生成
4. 必要に応じてアドレス等のデータ絞り込み用オブジェクトを生成
5. REST-API 接続用オブジェクトと絞り込み用オブジェクトを組合せて結果を Observable として取得
6. 必要に応じて Observable な結果を subscribe して値を取得したり, Observable な値をそのまま html での表示で使用

### 1-2. REST-API で特定のアドレスのアカウント情報を複数のノードを含むノードプールから堅牢な仕組みで取得

1-1 では 1 台の特定のノードから情報を取得するような実装を行いました.

しかし, そのような実装では, 「全世界に多数分散したノードを使用することで一部のノードがサービス停止していても他のノードを使うことで堅牢なサービスを実現できる」というブロックチェーンのメリットが活かせているとは言えません.

ここでは, 複数のノードを用いて, 1-1 と同様の機能を実装し, 複数のノードの内いずれかが動いていれば動作するようにしてみましょう!

`nem-library-sample-code/src/config/node.ts`の位置, ファイル名でファイルを作成してください. (別のファイルで定義しておいて export することで, 今後に何度も使いまわしする際に import するだけで即座に使えるようにしておくことを意図しています.)

そのファイル内で, 以下のように複数のノードの接続情報の配列を定義し, export します.

```typescript
import { ServerConfig } from "nem-library";
const httpsProtocol = "https";
const httpsPort = 7891;
export const serverConfigs: ServerConfig[] = [
  {
    protocol: httpsProtocol,
    domain: "aqualife1.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "aqualife2.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "aqualife3.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "beny.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "mnbhsgwbeta.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "mnbhsgwgamma.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemstrunk.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemstrunk2.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "mttsukuba.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "pegatennnag.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "shibuya.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "thomas1.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "xemcat.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "snnode.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely1.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely2.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely3.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely4.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely5.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely6.supernode.me",
    port: httpsPort,
  },
  {
    protocol: httpsProtocol,
    domain: "nemlovely7.supernode.me",
    port: httpsPort,
  },
];
```

複数ノードの接続設定の配列が定義できたので, 1-1 と同様の機能を以下のように`import { serverConfigs } from "<serverConfigsがexportされているファイルの相対パス>"`で実装します.

```typescript
import { NEMLibrary, NetworkTypes, AccountHttp, Address } from "nem-library";
import { serverConfigs } from "../../config/nodes";
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
const accountHttp = new AccountHttp(serverConfigs);
const address = new Address("NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M");
accountHttp.getFromAddress(address).subscribe(
  (x) => {
    console.log(x);
  },
  (error) => {
    console.log(error);
  },
  () => {
    console.log("Completed!");
  }
);
```

それでは作成したプログラムをターミナルで実行してみましょう!

以下コマンドを実行してください.

```sh
ts-node ./src/example/1-2/getAccountInfoWithMetaDataFromAddress.ts
```

以下のような結果が得られたら成功です!

```sh
AccountInfoWithMetaData {
  balance: Balance {
    balance: 2636145057,
    vestedBalance: 2636091909,
    unvestedBalance: 53148
  },
  importance: 0,
  publicAccount: PublicAccount {
    address: Address {
      value: 'NAX3EP4EKUMLH4T3N7GJSTQDG2AMUK5T26P5EA2M',
      networkType: 104
    },
    publicKey: '051beb2871a4dad21bb8b241a49837442a46a5628fc0c3951ae322121508a4a1'
  },
  harvestedBlocks: 0,
  cosignatoriesCount: undefined,
  minCosignatories: undefined,
  status: 'LOCKED',
  remoteStatus: 'INACTIVE',
  cosignatoryOf: [],
  cosignatories: []
}
completed!
```

内容自体は 1-1 と同じですが, 複数のノードの接続情報を使っているため, あるノードがサービス停止していても, 自動的に別のノードに接続して処理が行われ, 結果としてより堅牢なサービスを実現できることが期待できます.

### 1-3. WebSocket で特定のアドレスのアカウント情報の変化をリアルタイムに検知
