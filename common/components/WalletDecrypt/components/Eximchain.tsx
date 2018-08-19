import React, { FormEvent } from 'react';
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
  endpoint: string;
}

const EXIMCHAIN_AUTH = 'eximchain_auth';
const EXIMCHAIN_ENDPOINT = 'eximchain_endpoint';

class EximchainDecryptClass extends React.Component<Props> {
  public state: State = {
    auth: localStorage.getItem(EXIMCHAIN_AUTH) || '',
    endpoint: localStorage.getItem(EXIMCHAIN_ENDPOINT) || ''
  };

  public render() {
    return (
      <div>
        <Input
          placeholder="Enter your executor url (e.g. http://ip:port/rpc)"
          type="text"
          name="endpoint"
          onChange={this.handleChange}
          value={this.state.endpoint}
          isValid={this.isEndpointValid()}
        />

        <Input
          placeholder="Enter your eximchain key"
          type="text"
          name="auth"
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

  private isEndpointValid = (): boolean => {
    return this.state.endpoint.length > 0;
  };

  private handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  private handleClick = () => {
    const { auth, endpoint } = this.state;

    if (!this.isEndpointValid()) {
      return this.props.showNotification(
        'warning',
        'Please enter your executor url (e.g. http://ip:port/rpc)'
      );
    }

    if (!this.isAuthValid()) {
      return this.props.showNotification('warning', 'Please enter your eximchain key');
    }

    localStorage.setItem(EXIMCHAIN_AUTH, auth);
    localStorage.setItem(EXIMCHAIN_ENDPOINT, endpoint);

    this.props.onUnlock();
  };
}

export const EximchainDecrypt = connect(() => ({}), {
  showNotification: notificationsActions.showNotification
})(EximchainDecryptClass);
