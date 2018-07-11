import RPCClient from '../rpc/client';
import { RPCRequest } from '../rpc/types';

export default class EximchainClient extends RPCClient {
  public decorateRequest = (req: RPCRequest) => ({
    ...req,
    id: this.id(),
    jsonrpc: '2.0',
    params: req.params || []
  });
}
