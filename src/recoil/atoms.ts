import { ReactNode } from "react";
import { atom } from "recoil";

export const popupState = atom<ReactNode | ReactNode[] | undefined>({
  key: "popup",
  default: undefined,
});
