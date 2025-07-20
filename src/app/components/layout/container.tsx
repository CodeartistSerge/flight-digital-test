'use client'

import styled from 'styled-components';
import { media } from '@/lib/utils/media-query'

const Section = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 140rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  & > * {
    position: relative;
    z-index: 3;
    /* display: flex;
    flex-wrap: nowrap; */
  }
  ${media.md} {
    padding: 4rem 8rem;
  }
  ${media.xl} {
    padding: 8rem 16rem;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100%;
    z-index: 1;
    background: var(--color-canvas);
  }
`

interface containerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: containerProps) {
	return (
		<Section className={className}>
			{children}
		</Section>
	)
}