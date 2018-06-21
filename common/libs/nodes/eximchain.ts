import { Wei } from 'libs/units';

export default class EximchainNode {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public getNetVersion(): Promise<string> {
    console.log('eximchain.getNetVersion');
    return Promise.resolve('0.1.0');
  }

  public getVaultKey(): Promise<string> {
    return this.fetch('/get-vault-key').then(data => data.key);
  }

  public ping(): Promise<boolean> {
    console.log('eximchain.ping');
    return Promise.resolve(true);
  }

  public sendCallRequest(txObj: TxObj): Promise<string> {
    console.log('eximchain.sendCallRequest');
  }

  public sendCallRequests(txObjs: TxObj[]): Promise<string[]> {
    console.log('eximchain.sendCallRequests');
  }

  public getBalance(address: string): Promise<Wei> {
    console.log('eximchain.getBalance');
    return this.fetch('/get-balance', { address }).then(data => Wei(data.balance));
  }

  public estimateGas(transaction: Partial<IHexStrTransaction>): Promise<Wei> {
    console.log('eximchain.estimateGas');
  }

  public getTransactionCount(address: string): Promise<string> {
    console.log('eximchain.getTransactionCount');
    return Promise.resolve('0x121');
  }

  public getCurrentBlock(): Promise<string> {
    return this.fetch('/get-current-block').then(data => data.block);
  }

  public sendRawTx(signedTx: string): Promise<string> {}

  public getTransactionByHash(txhash: string): Promise<TransactionData> {
    console.log('eximchain.getTransactionByHash');
  }

  public getTransactionReceipt(txhash: string): Promise<TransactionReceipt> {
    console.log('eximchain.getTransactionReceipt');
  }

  private fetch(path: string, body): Promise<any> {
    return fetch(`${this.endpoint}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  }
}

export async function setupEximchainNode() {
  const lib = new EximchainNode('http://localhost:7000');
  const key = await lib.getVaultKey();

  if (!key) {
    throw new Error('Not vault key from eximchain');
  }

  return { lib, chainId: 8888888 };
}
