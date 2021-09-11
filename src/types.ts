import { ComponentType, ReactNode } from "react";

export interface Route {
  label: string,
  path: string,
  // component: ComponentType,
}

export interface PrimaryBtnProp {
  disabled?: boolean,
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

export interface NavBtnProp {
  active: boolean,
  title: string,
}

export interface WalletBtnProp {
  connected: boolean,
  address: string, 
}

export interface ChildrenProp {
  children: ReactNode | ReactNode[] | string | string[] | undefined
}
