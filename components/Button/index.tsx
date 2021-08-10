import React, { ReactNode, ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

const InsideButton = styled.button<{ primary?: boolean }>`
  border: 1px solid ${(props) => (props.primary ? 'white' : '#447bdb')};
  background: ${(props) => (props.primary ? '#447bdb' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#447bdb')};
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export type ButtonProps = {
  children: ReactNode;
  btnType?: 'primary' | 'ghost';
};

export function Button({
  children,
  btnType,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLElement>) {
  return (
    <InsideButton primary={btnType === 'primary'} {...props}>
      {children}
    </InsideButton>
  );
}
