import {
  NEMLibrary,
  NetworkTypes,
  Address,
  AccountListener,
} from "nem-library";

import { webSocketConfigs } from "../../configs/nodes";

NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);

const address = new Address("NAX3EP-4EKUML-H4T3N7-GJSTQD-G2AMUK-5T26P5-EA2M");

const accountListener = new AccountListener(webSocketConfigs).given(address);

// 後でunsubscribeできるよう定義
const accountSubscription = accountListener.subscribe(
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

// timeoutや不要になったらunsubscribe
setTimeout(() => {
  console.log("Time out!");
  accountSubscription.unsubscribe();
}, 180000);
