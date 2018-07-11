import {
  isValidSendTransaction,
  isValidSignMessage,
  isValidGetAccounts,
  isValidGetNetVersion
} from 'libs/validators';
import RPCNode from '../rpc';
import EximchainClient from './client';
import EximchainRequests from './requests';

export default class EximchainNode extends RPCNode {
  public client: EximchainClient;
  public requests: EximchainRequests;

  constructor() {
    const endpoint = 'http://localhost:7545';
    // process.env.NODE_ENV === 'production'
    //   ? 'https://mock-pvhidmrduh.now.sh'
    //   : 'http://localhost:7000';

    super(endpoint);
    this.client = new EximchainClient(endpoint, {
      // Authorization: localStorage.getItem('eximchain_auth') || ''
    });
    this.requests = new EximchainRequests();
  }

  public getNetVersion(): Promise<string> {
    return this.client
      .call(this.requests.getNetVersion())
      .then(isValidGetNetVersion)
      .then(({ result }) => result);
  }

  public sendTransaction(web3Tx: IHexStrWeb3Transaction): Promise<string> {
    return this.client
      .call(this.requests.sendTransaction(web3Tx))
      .then(isValidSendTransaction)
      .then(({ result }) => result);
  }

  public signMessage(msgHex: string, fromAddr: string): Promise<string> {
    return this.client
      .call(this.requests.signMessage(msgHex, fromAddr))
      .then(isValidSignMessage)
      .then(({ result }) => result);
  }

  public getAccounts(): Promise<string> {
    return this.client
      .call(this.requests.getAccounts())
      .then(isValidGetAccounts)
      .then(({ result }) => result);
  }

  // public sendTransaction(tx): Promise<string> {
  //   return this.fetch('/execute-transaction', {
  //     from: tx.from,
  //     to: tx.to,
  //     amount: tx.value,
  //     gasLimit: tx.gas,
  //     gasPrice: tx.gasPrice,
  //     data: tx.data
  //   }).then(data => data.txHash);
  // }

  // private fetch(path: string, body): Promise<any> {
  //   return fetch(`${this.endpoint}${path}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: localStorage.getItem('eximchain_auth')
  //     },
  //     body: JSON.stringify(body)
  //   }).then(r => r.json());
  // }
}

export async function setupEximchainNode() {
  const lib = new EximchainNode();
  const accounts = await lib.getAccounts();

  if (!accounts.length) {
    throw new Error('Not accounts found in Eximchain');
  }

  return { lib, chainId: 8888888 };
}
