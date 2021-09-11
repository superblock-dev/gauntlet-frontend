import { useMemo } from "react";
import { createPortal } from "react-dom";
import { ChildrenProp } from 'types'; 

function Popup({ children }: ChildrenProp) {
  function renderChildren() {
    return (
      <>
        {children}
      </>
    )
  }
  
  const rootElement = useMemo<HTMLElement>(() => document.getElementById("popup")!, [
    "popup",
  ]);
  return createPortal(renderChildren(), rootElement);
}

export default Popup;
