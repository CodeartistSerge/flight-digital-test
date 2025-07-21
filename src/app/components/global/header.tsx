'use client'

import styled from 'styled-components';
import Container from '@/app/components/layout/container';
import Link from 'next/link';

const HeaderContainer = styled(Container)`
  z-index: 10;
  padding-top: 3rem;
  padding-bottom: 2rem;
  &:before {
    background: var(--color-accent);
    box-shadow: 0 1rem 1rem 0 var(--color-shadow);
  }
  & a {
    display: block;
    width: 100%;
    text-align: center;
    text-decoration: none !important;
    color: var(--color-white);
  }
  & > h3 {
    text-align: center;
    display: block;
    width: 100%;
    text-decoration: none !important;
  }
`

export default function Header() {
	return (
		<HeaderContainer>
			<h3>
        <Link href="/">Flight Digital Pokedex</Link>
      </h3>
		</HeaderContainer>
	)
}