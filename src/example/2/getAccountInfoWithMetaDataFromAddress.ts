/*
2. 残高情報の取得と表示(1と同様の処理だが、単一ノードでなく複数ノードを扱える実装で、より堅牢)
ノード, アドレスを指定し、REST-APIリクエストし、残高等の情報を取得し、表示するサンプルコード
*/
import { NEMLibrary, NetworkTypes, AccountHttp, Address } from "nem-library";

// 他の箇所でも何度も使用するので、一か所でまとめて定義してexportしたものをimportして使用
import { serverConfigs } from "../../configs/nodes";

// 以降は1と同様
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
