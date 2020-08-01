/*
1. 残高情報の取得と表示
ノード, アドレスを指定し、REST-APIリクエストし、残高等の情報を取得し、表示するサンプルコード
*/

// 必要なモジュールを読込
import {
  NEMLibrary,
  ServerConfig,
  NetworkTypes,
  Address,
  AccountHttp,
} from "nem-library";

// メインネットの設定でNEMLibraryを初期化
NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);

// リクエスト先のノードのドメイン名とポート番号を指定し、接続に必要な設定配列、接続用オブジェクトを作成
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

// 残高等の情報をリクエストするアドレスを指定し、アドレスオブジェクトを作成
const addressString = "NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M";
const address = new Address(addressString);

// 接続用オブジェクトとアドレスオブジェクトを組み合わせてREST-APIリクエストを投げて、得られた値をconsoleに表示
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
