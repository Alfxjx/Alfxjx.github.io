import React from "react";

export interface IDefaultButton {
  onClick: () => void;
  children: React.ReactNode;
}

export default function DefaultButton({ onClick, children }: IDefaultButton) {
  return <button onClick={onClick}>{children}</button>;
}
