'use client'

import styled from "styled-components"
import Container from "../layout/container"
import Image from "next/image"
import { PokemonResource, PokemonSpecies } from "@/lib/types/pokeapi"
import { useEffect, useState } from "react"
import Preloader from "../global/preloader"

const HeadContainer = styled(Container)`
padding-bottom: 0;
margin-bottom: -8rem;
  & > h1 {
    text-align: center;
    background: val(--color-grey) !important;
    span {
    }
  }
`

const HCHIContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4rem;
  padding: 4rem 4rem;
  border-radius: 4rem;
  background: var(--color-white);
  & > * {
    width: 0;
    flex-grow: 0;
  }
  & > div.leftColumn {
    width: 30rem;
    & > img {
      width: 100%;
      height: auto;
    }
  }
  & > div.rightColumn {
    flex-grow: 1;
    p {
      margin-bottom: 3rem;
    }
  }
`

const Img = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
`

const ParametersWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  & > h5 {
    text-transform: none;
    & > span {
      display: inline-block;
      margin: 0 0.5rem;
      text-transform: capitalize;
    }
  }
`

interface Props {
  data: PokemonResource,
  species: PokemonSpecies
}

export default function PokemonProfile({ data, species }:Props) {
  const [stylesReady, setStylesReady] = useState(false);
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
    const image = data.sprites.other["official-artwork"].front_default ?? "/placeholder.svg";
    console.log(species);
    return (
      <>
        <HeadContainer>
          <h1>{data.name} <span>#{data.id.toString().padStart(4, '0')}</span></h1>
        </HeadContainer>
        <Container>
          <HCHIContainer>
            <div className="leftColumn">
              <Img
                src={image as string}
                width={100}
                height={100}
                alt={`Pokemon: ${data.name}`}
              />
            </div>
            <div className="rightColumn">
              <h4 key={`${data.id}-desc`}>Description</h4>
              {(descs => descs.map(desc => (
                <p key={`${data.id}-desc-p`}>{ desc.flavor_text }</p>
              )))(species.flavor_text_entries.slice(0,1))}
              <h4 key={`${data.id}-params`}>Parameters</h4>
              <ParametersWrap>
                <h5 key={`${data.id}-params-height`}>Height: {data.height}</h5>
                <h5 key={`${data.id}-params-weight`}>Weight: {data.weight}</h5>
                <h5 key={`${data.id}-params-types`}>Types: {(t => t.map(vv => (
                  <span key={`${data.id}-params-types${vv.type.name}`}>{vv.type.name}</span>
                )))(data.types)}</h5>
                {species.has_gender_differences && <h5 key={`${data.id}-params-gender`}>Has gender differences</h5> || <h5 key={`${data.id}-params-gender`}>No gender differences</h5>}
              </ParametersWrap>
            </div>
          </HCHIContainer>
        </Container>
      </>
    )
  }
}