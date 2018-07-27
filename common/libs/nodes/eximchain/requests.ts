import RPCRequests from '../rpc/requests';
import { SendTransactionRequest, SignMessageRequest, GetAccountsRequest } from './types';
import { IHexStrWeb3Transaction } from 'libs/transaction';

export default class EximchainRequests extends RPCRequests {
  public sendTransaction(web3Tx: IHexStrWeb3Transaction): SendTransactionRequest {
    return {
      method: 'eth_sendTransaction',
      params: [web3Tx]
    };
  }

  public getAccounts(): GetAccountsRequest {
    return {
      method: 'eth_accounts'
    };
  }
}
