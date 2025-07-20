'use client'

import styled from 'styled-components';
import Container from '@/app/components/layout/container';

const FooterContainer = styled(Container)`
  text-align: center;
  z-index: 10;
  padding-top: 4rem;
  padding-bottom: 4rem;
  &:before {
    background: var(--color-canvas);
    transform: translate(-50%, -50%) scale(1, -1);
    box-shadow: 0 1rem 1rem 0 var(--color-shadow);
  }
  & > small {
    display: block;
    width: 100%;
    text-align: center;
  }
`

export default function Footer() {
	return (
    <FooterContainer>
      <small className="text-white">Flight Digital Next.js Pokedex Test 2025</small>
    </FooterContainer>
	)
}