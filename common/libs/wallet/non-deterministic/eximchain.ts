import { IFullWallet } from '../IWallet';

export default class EximchainWallet implements IFullWallet {
  private address: string;

  constructor(address: string) {
    this.address = address;
  }

  public getAddressString(): string {
    return this.address;
  }

  public signRawTransaction(): Promise<Buffer> {
    return Promise.reject(new Error('Eximchain wallets cannot sign raw transactions.'));
  }

  public async signMessage(msg: string, nodeLib): Promise<string> | string {
    return 'signed message';
  }
}
