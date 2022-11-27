import React from "react"

export interface IDefaultButton {
  children: React.ReactNode
}

export default function DefaultButton({ children }: IDefaultButton) {
  return (
    <button>{children}</button>
  )
}