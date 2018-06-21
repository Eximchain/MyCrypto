import { IFullWallet } from '../IWallet';
import { getTransactionFields, makeTransaction } from 'libs/transaction';

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

  public async sendTransaction(serializedTransaction: string, nodeLib): Promise<string> {
    const transactionInstance = makeTransaction(serializedTransaction);
    const { to, value, gasLimit: gas, gasPrice, data, nonce, chainId } = getTransactionFields(
      transactionInstance
    );
    const from = this.address;
    const eximchainTx = {
      from,
      to,
      value,
      gas,
      gasPrice,
      data,
      nonce,
      chainId
    };

    if (!nodeLib) {
      throw new Error('');
    }

    // await this.networkCheck(nodeLib, networkConfig);

    return nodeLib.sendTransaction(eximchainTx);
  }
}
