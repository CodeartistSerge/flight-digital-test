'use client'

import styled from 'styled-components';
import { PokemonResource } from "@/lib/types/pokeapi"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react';
import Preloader from '../global/preloader';

const Ul = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;

const Card = styled.li`
  display: block;
  position: relative;
  background: var(--color-white);
  border-radius: 4rem;
  padding: 2rem 4rem;
	transition: all 0.3s;
  box-shadow: 0 0 0 0 var(--color-shadow);
  transform: scale(1, 1);
  &:hover {
    transform: scale(1.03, 1.03);
    box-shadow: 0 0 2rem 0.1rem var(--color-shadow);
  }
`

const Img = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
`

const TypePill = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  background: var(--color-grey);
`

const PillWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  gap: 0.3rem;
`

const CardLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-decoration: none;
`

interface Props {
  pokemons: PokemonResource[];
  className?: string;
}

export default function PokemonGrid({ pokemons }: Props) {
  const [stylesReady, setStylesReady] = useState(false);

  // We are waiting while styled component are loaded showing preloader instead
  useEffect(() => {
    const interval = setInterval(() => {
      const styledTag = document.querySelector('style[data-styled]');
      if (styledTag) {
        clearInterval(interval);
        setStylesReady(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!stylesReady) {
    return (<Preloader />);
  } else {
    return (
      <Ul>
        {(pokemons => pokemons.slice(0, 12).map(v => (
          <Card key={v.id}>
            <Img
              src={v.image as string}
              width={100}
              height={100}
              alt={`Pokemon: ${v.name}`}
            />
            <small>#{v.id.toString().padStart(4, '0')}</small>
            <h5>{v.name}</h5>
            <PillWrap>
              {(t => t.map(vv => (
                <TypePill
                  key={`${v.id}-${vv.type.name}`}
                  className={`background-color-${vv.type.name}`}
                >{vv.type.name}</TypePill>
              )))(v.types)}
            </PillWrap>
            <CardLink href={`/pokemon/${v.id}`}></CardLink>
          </Card>
        )))(pokemons)}
      </Ul>
    )
  }
}