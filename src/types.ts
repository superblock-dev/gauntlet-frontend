import { ComponentType } from "react";

export interface Route {
  label: string,
  path: string,
  // component: ComponentType,
}

export interface NavBtnProp {
  active: boolean,
  title: string,
}

export interface WalletBtnProp {
  connected: boolean,
  address: string, 
}
