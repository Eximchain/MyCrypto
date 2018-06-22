import React from 'react';

interface Props {
  onUnlock(): void;
}

export const EximchainDecrypt: React.SFC<Props> = ({ onUnlock }) => (
  <div>
    Connecting to Eximchain
    <button className="btn btn-primary btn-lb btn-block" onClick={onUnlock}>
      Connect
    </button>
  </div>
);
