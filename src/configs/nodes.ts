import { ServerConfig } from "nem-library";
import { WebSocketConfig } from "nem-library/dist/src/infrastructure/Listener";

const httpsProtocol = "https";
const httpsPort = 7891;
const httpsWebSocketPort = 7779;

// 以下では、https://github.com/ethersecurity/nodes/blob/master/nem/nodes.txt のノードを使わせて頂いています。ありがとうございます。
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

export const webSocketConfigs: WebSocketConfig[] = serverConfigs.map(
  (serverConfig: ServerConfig) => {
    const tempWebSocketConfig: WebSocketConfig = {
      protocol: serverConfig.protocol,
      domain: serverConfig.domain,
      port: httpsWebSocketPort,
    };
    return tempWebSocketConfig;
  }
);
