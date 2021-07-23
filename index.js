const { ApiPromise, WsProvider } = require("@polkadot/api");
const BIGTIME = "4f5Pwpym5u6PUQymmMTaCJQ8N3AjrtfYF3ZScEmdkG82cM4c";
const connect = async () => {
  const wsProvider = new WsProvider("wss://fullnode.centrifuge.io");
  const api = await ApiPromise.create({ provider: wsProvider });

  const account = await api.query.system.account(BIGTIME);

  const activeEra = await api.query.staking.activeEra();

  const keys = await api.query.staking.nominators.keys();

  api.tx.staking.payoutStakers();

  const nominatorIds = keys.map(({ args: [nominatorId] }) => nominatorId);

  console.log("all nominators:", nominatorIds.join(", "));
};
connect();
