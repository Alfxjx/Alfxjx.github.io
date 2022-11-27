import React from "react";

export interface IDefaultButton {
  onClick: () => void;
  children: React.ReactNode;
  btnType?: 'default' | 'primary';
  round?: boolean;
}

export function Button({ onClick, round, children }: IDefaultButton) {
  return <button
    className={`hover:bg-gray-200 dark:hover:bg-gray-700 p-2 ${!!round ? 'rounded-full' : 'rounded'}`}
    onClick={onClick}
  >{children}</button>;
}
