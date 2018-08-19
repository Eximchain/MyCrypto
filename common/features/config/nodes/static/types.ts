import { StaticNodeConfig, StaticNodeConfigs } from 'types/node';

export type StaticNodesState = StaticNodeConfigs;

export enum CONFIG_NODES_STATIC {
  WEB3_SET = 'CONFIG_NODES_STATIC_WEB3_SET',
  WEB3_UNSET = 'CONFIG_NODES_STATIC_WEB3_UNSET',
  EXIMCHAIN_SET = 'CONFIG_NODES_STATIC_EXIMCHAIN_SET',
  EXIMCHAIN_UNSET = 'CONFIG_NODES_STATIC_EXIMCHAIN_UNSET'
}

export interface Web3setNodeAction {
  type: CONFIG_NODES_STATIC.WEB3_SET | CONFIG_NODES_STATIC.EXIMCHAIN_SET;
  payload: { id: 'web3' | 'eximchain'; config: StaticNodeConfig };
}

export interface Web3UnsetNodeAction {
  type: CONFIG_NODES_STATIC.WEB3_UNSET | CONFIG_NODES_STATIC.EXIMCHAIN_UNSET;
}

export type StaticNodeAction = Web3setNodeAction | Web3UnsetNodeAction;
