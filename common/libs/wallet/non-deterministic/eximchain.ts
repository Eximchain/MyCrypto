import { IFullWallet } from '../IWallet';

export default class EximchainWallet implements IFullWallet {
  private address: string;
  private network: string;

  constructor(address: string, network: string) {
    this.address = address;
    this.network = network;
  }

  public getAddressString(): string {
    return this.address;
  }

  public signRawTransaction(): Promise<Buffer> {
    return Promise.reject(new Error('Eximchain wallets cannot sign raw transactions.'));
  }

  public async signMessage(msg: string, nodeLib: Web3Node | INode): Promise<string> | string {}
}
