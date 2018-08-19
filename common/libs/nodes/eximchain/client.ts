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
    const req = this.decorateRequest(request);
    return fetch(this.endpoint, {
      method: 'POST',
      headers: this.createHeadersPrivate({
        'Content-Type': 'application/json',
        ...this.headers
      }),
      body: JSON.stringify(req)
    })
      .then(r => r.json())
      .then(json => {
        // Workaround for Go-kit 0.7.0: always adds a member "error":null
        // https://github.com/go-kit/kit/issues/728
        if (json.error === null) {
          delete json.error;
        }

        // Workaround for Go-kit 0.7.0: does not add REQUIRED member "id"
        // https://github.com/go-kit/kit/pull/742
        if (json.id === undefined) {
          json.id = req.id;
        }
        return json;
      });
  };

  private createHeadersPrivate = (headerObject: HeadersInit) => {
    const headers = new Headers();
    Object.entries(headerObject).forEach(([name, value]) => {
      headers.append(name, value);
    });
    return headers;
  };
}
