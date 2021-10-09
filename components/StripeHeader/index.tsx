import React, { useEffect } from 'react';

import styled from 'styled-components';

import { Gradient } from './tool';

const GradientCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  --gradient-color-1: #ef008f;
  --gradient-color-2: #6ec3f4;
  --gradient-color-3: #7038ff;
  --gradient-color-4: #ffba27;

  /* --gradient-color-1: #d11a2d;
  --gradient-color-2: #10aec2;
  --gradient-color-3: #806d9e;
  --gradient-color-4: #fbda41; */
`;

export const StripeHeader = () => {
  useEffect(() => {
    const gradient = new Gradient();
    // @ts-ignore
    gradient.initGradient('#gradient-canvas');
  }, []);
  return <GradientCanvas id="gradient-canvas" data-js-darken-top data-transition-in />;
};
