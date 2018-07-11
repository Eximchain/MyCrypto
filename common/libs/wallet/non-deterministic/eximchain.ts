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

  public async signMessage(msg: string, nodeLib: Web3Node | INode): Promise<string> {
    const msgHex = bufferToHex(Buffer.from(msg));

    if (!nodeLib) {
      throw new Error('');
    }
    /*
    if (!isWeb3Node(nodeLib)) {
      throw new Error('Web3 wallets can only be used with a Web3 node.');
    }*/

    return (nodeLib as Web3Node).signMessage(msgHex, this.address);
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
