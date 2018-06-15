import { IRPCProvider } from 'mycrypto-shepherd/dist/lib/types';
import { Wei } from 'libs/units';

export class EximchainProvider implements IRPCProvider {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
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

  public getNetVersion(): Promise<string> {
    console.log('eximchain.getNetVersion');
    return Promise.resolve('0.1.0');
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
  }

  public getCurrentBlock(): Promise<string> {
    console.log('eximchain.getCurrentBlock');
    return Promise.resolve('current block not supported yet');
  }

  public sendRawTx(signedTx: string): Promise<string> {}

  public getTransactionByHash(txhash: string): Promise<TransactionData> {
    console.log('eximchain.getTransactionByHash');
  }

  public getTransactionReceipt(txhash: string): Promise<TransactionReceipt> {
    console.log('eximchain.getTransactionReceipt');
  }
}
