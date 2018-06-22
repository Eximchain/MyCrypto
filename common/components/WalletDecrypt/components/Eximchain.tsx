import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'components/ui';
import { notificationsActions } from 'features/notifications';

interface OwnProps {
  onUnlock(): void;
}

interface DispatchProps {
  showNotification: notificationsActions.TShowNotification;
}

type Props = OwnProps & DispatchProps;

interface State {
  auth: string;
}

const AUTH_KEY = 'eximchain_auth';

class EximchainDecryptClass extends React.Component<Props> {
  public state: State = {
    auth: localStorage.getItem(AUTH_KEY) || ''
  };

  public render() {
    return (
      <div>
        <Input
          placeholder="Enter your eximchain key"
          type="text"
          onChange={this.handleChange}
          value={this.state.auth}
          isValid={this.isAuthValid()}
        />
        <button className="btn btn-primary btn-lb btn-block" onClick={this.handleClick}>
          Connect
        </button>
      </div>
    );
  }

  private isAuthValid = (): boolean => {
    return this.state.auth.length > 0;
  };

  private handleChange = e => {
    this.setState({ auth: e.target.value });
  };

  private handleClick = () => {
    const { auth } = this.state;

    if (!this.isAuthValid()) {
      return this.props.showNotification('warning', 'Please enter your eximchain key');
    }

    localStorage.setItem(AUTH_KEY, auth);

    this.props.onUnlock();
  };
}

export const EximchainDecrypt = connect(() => ({}), {
  showNotification: notificationsActions.showNotification
})(EximchainDecryptClass);
