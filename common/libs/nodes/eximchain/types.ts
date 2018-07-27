import { JsonRpcResponse, RPCRequest, RPCRequestBase, DATA, QUANTITY } from '../rpc/types';

type MESSAGE_HEX = string;
type ADDRESS = string;

export interface SendTransactionRequest extends RPCRequestBase {
  method: 'eth_sendTransaction';
  params: [
    {
      from: DATA;
      to: DATA;
      gas: QUANTITY;
      gasPrice: QUANTITY;
      value: QUANTITY;
      data?: DATA;
      nonce?: QUANTITY;
    }
  ];
}

export interface GetAccountsRequest extends RPCRequestBase {
  method: 'eth_accounts';
}

type TEximchainProviderCallback = (
  error: string,
  result: JsonRpcResponse | JsonRpcResponse[]
) => any;
type TSendAsync = (request: RPCRequest | any, callback: TEximchainProviderCallback) => void;

export interface IEximchainProvider {
  sendAsync: TSendAsync;
}
