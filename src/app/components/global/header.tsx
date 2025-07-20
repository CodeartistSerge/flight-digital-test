'use client'

import styled from 'styled-components';
import Container from '@/app/components/layout/container';
import Link from 'next/link';

const HeaderContainer = styled(Container)`
  z-index: 10;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &:before {
    background: var(--color-canvas);
    box-shadow: 0 1rem 1rem 0 var(--color-shadow);
  }
  & > a {
    display: block;
    width: 100%;
    text-align: center;
  }
`

export default function Header() {
	return (
		<HeaderContainer>
			<Link href="/">Flight Digital Pokedex</Link>
		</HeaderContainer>
	)
}