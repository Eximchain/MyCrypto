import {
  isValidSendTransaction,
  isValidSignMessage,
  isValidGetAccounts,
  isValidGetNetVersion,
  isValidCallRequest
} from 'libs/validators';
import RPCNode from '../rpc';
import EximchainClient from './client';
import { IHexStrWeb3Transaction } from '../../transaction';
import Web3Requests from '../web3/requests';
import { IRPCProvider } from 'mycrypto-shepherd/dist/lib/types';
import { TxObj } from '../INode';

export default class EximchainNode extends RPCNode implements IRPCProvider {
  public client: EximchainClient;
  public requests: Web3Requests;

  constructor() {
    const endpoint = `${localStorage.getItem('eximchain_endpoint')}`;

    super(endpoint);

    this.client = new EximchainClient(endpoint, {
      Authorization: localStorage.getItem('eximchain_auth') || ''
    });
    this.requests = new Web3Requests();
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

  public sendCallRequests(txObjs: TxObj[]): Promise<string[]> {
    return this.client
      .batch(txObjs.map(this.requests.ethCall))
      .then(r => r.map(isValidCallRequest))
      .then(r => r.map(({ result }) => result));
  }
}

export async function setupEximchainNode() {
  const lib = new EximchainNode();
  const accounts = await lib.getAccounts();

  if (!accounts.length) {
    throw new Error('Not accounts found in Eximchain');
  }

  return { lib, chainId: 1235813 };
}
