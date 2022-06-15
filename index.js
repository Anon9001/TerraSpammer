// This is a commnad line option proof of concept in case someone doesn't like the website version
const { LCDClient, MsgSend, MnemonicKey } = require('@terra-money/terra.js');


async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
    'celery expire lawsuit dance sick power injury honey predict noodle myself fold address culture auto belt cinnamon truly couch gallery injury resemble grant word',
  });

  const bombay = new LCDClient({
    chainID: 'pisco-1',
    URL: 'https://pisco-lcd.terra.dev',
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1v7hcjz5cvgr0z5uz8j4tdqlw7eduzdzcm6mtus',
    'terra1luw3f6k407wqmse8wlw56em8zjs95tx2w53pcc',
    { uluna: .001 * 1000000 }
    );

  wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from terra.js!',
  })
  .then(tx => bombay.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });

}

main().catch(console.error);