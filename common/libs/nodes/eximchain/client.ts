import RPCClient from '../rpc/client';
import { JsonRpcResponse, RPCRequest } from '../rpc/types';

export default class EximchainClient extends RPCClient {
  public decorateRequest = (req: RPCRequest) => ({
    ...req,
    id: this.id(),
    jsonrpc: '2.0',
    params: req.params || []
  });

  public call = (request: RPCRequest | any): Promise<JsonRpcResponse> => {
    return fetch(this.endpoint, {
      method: 'POST',
      headers: this.createHeaders({
        'Content-Type': 'application/json',
        ...this.headers
      }),
      body: JSON.stringify(this.decorateRequest(request))
    })
      .then(r => r.json())
      .then(json => {
        if (!json.error) {
          delete json.error;
        }
        return json;
      });
  };

  private createHeaders = (headerObject: HeadersInit) => {
    const headers = new Headers();
    Object.entries(headerObject).forEach(([name, value]) => {
      headers.append(name, value);
    });
    return headers;
  };
}
