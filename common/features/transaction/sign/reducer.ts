import * as transactionTypes from '../types';
import * as types from './types';

export type StateSerializedTx =
  | types.TransactionSignState['local']['signedTransaction']
  | types.TransactionSignState['web3']['transaction']
  | types.TransactionSignState['eximchain']['transaction'];

export const SIGN_INITIAL_STATE: types.TransactionSignState = {
  local: { signedTransaction: null },
  web3: { transaction: null },
  eximchain: { transaction: null },
  indexingHash: null,
  pending: false
};

const signTransactionRequested = (): types.TransactionSignState => ({
  ...SIGN_INITIAL_STATE,
  pending: true
});

const signLocalTransactionSucceeded = (
  _: types.TransactionSignState,
  { payload }: types.SignLocalTransactionSucceededAction
): types.TransactionSignState => ({
  indexingHash: payload.indexingHash,
  pending: false,

  local: { signedTransaction: payload.signedTransaction },
  web3: { transaction: null },
  eximchain: { transaction: null }
});

const signWeb3TranscationSucceeded = (
  _: types.TransactionSignState,
  { payload }: types.SignWeb3TransactionSucceededAction
): types.TransactionSignState => ({
  indexingHash: payload.indexingHash,
  pending: false,

  local: { signedTransaction: null },
  web3: { transaction: payload.transaction },
  eximchain: { transaction: null }
});

const signEximchainTranscationSucceeded = (
  _: types.TransactionSignState,
  { payload }: types.SignEximchainTransactionSucceededAction
): types.TransactionSignState => ({
  indexingHash: payload.indexingHash,
  pending: false,

  local: { signedTransaction: null },
  web3: { transaction: null },
  eximchain: { transaction: payload.transaction }
});

const signTransactionFailed = () => SIGN_INITIAL_STATE;

const resetSign = () => SIGN_INITIAL_STATE;

export function signReducer(
  state: types.TransactionSignState = SIGN_INITIAL_STATE,
  action: types.TransactionSignAction | transactionTypes.ResetTransactionSuccessfulAction
) {
  switch (action.type) {
    case types.TransactionSignActions.SIGN_TRANSACTION_REQUESTED:
      return signTransactionRequested();
    case types.TransactionSignActions.SIGN_LOCAL_TRANSACTION_SUCCEEDED:
      return signLocalTransactionSucceeded(state, action);
    case types.TransactionSignActions.SIGN_WEB3_TRANSACTION_SUCCEEDED:
      return signWeb3TranscationSucceeded(state, action);
    case types.TransactionSignActions.SIGN_EXIMCHAIN_TRANSACTION_SUCCEEDED:
      return signEximchainTranscationSucceeded(state, action);
    case types.TransactionSignActions.SIGN_TRANSACTION_FAILED:
      return signTransactionFailed();
    case transactionTypes.TransactionActions.RESET_SUCCESSFUL:
      return resetSign();
    default:
      return state;
  }
}
