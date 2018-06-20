import React from 'react';

interface Props {
  onUnlock(): void;
}

export const EximchainDecrypt: React.SFC<Props> = ({ onUnlock }) => (
  <div>
    Eximchain unlock
    <button className="btn btn-primary btn-lb btn-block" onClick={onUnlock}>
      Unlock
    </button>
  </div>
);
