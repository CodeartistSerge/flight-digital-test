'use client'

import styled from 'styled-components';
import { PokemonResource } from "@/lib/types/pokeapi"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from 'react';
import Preloader from '../global/preloader';
import { Grommet, Box, Select, TextInput } from 'grommet';
import { useDebouncer } from '@/lib/utils/debouncer';
import { media } from '@/lib/utils/media-query';

const Button = styled.button`
  display: block;
  width: 30rem;
  align-self: center;
  background: var(--color-accent);
  color: var(--color-white);
  border-radius: 20rem;
  padding: 1rem 2rem;
  margin-top: 6rem;
  border: none;
  font-size: 1.4rem;
  box-shadow: 0 1rem 1rem 0 var(--color-shadow);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  text-decoration: none;
  &:disabled {
    opacity: 0.5;
    cursor: initial;
  }
  ${media.xl} {
    padding: 1.5rem 2.5rem;
    font-size: 2rem;
  }
`

const Ul = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  ${media.lg} {
  grid-template-columns: repeat(4, 1fr);
  }
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

const sortOptions = [
  {
    label: 'Lowest Number (First)',
    value: '1'
  },
  {
    label: 'Highest Number (First)',
    value: '2'
  },
  {
    label: 'A-Z',
    value: '3'
  },
  {
    label: 'Z-A',
    value: '4'
  },
];

export default function PokemonGrid({ pokemons }: Props) {
  const allSuggestions = pokemons.map(v => v.name);
  const [stylesReady, setStylesReady] = useState(false);
  const [sortVal, setSortVal] = useState(sortOptions[0]);
  const [rawSuggestions, setSuggestions] = useState(allSuggestions);
  const suggestions = useDebouncer(rawSuggestions, 200);
  const [searchVal, setSearchVal] = useState('');

  const pageSize = 12;
  const [curPage, setCurPage] = useState(1);

  // We are waiting while styled components are loaded showing preloader instead
  useEffect(() => {
    setCurPage(1);
  }, [suggestions, searchVal]);

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

  const onSearchChange = (event:{ target: {value:string}; }) => {
    const nextValue = event.target.value;
    setSearchVal(nextValue);
    if (!nextValue) setSuggestions(allSuggestions);
    else {
      const regexp = new RegExp(`^${nextValue}`);
      setSuggestions(allSuggestions.filter((s) => regexp.test(s)));
    }
  };
  const onSuggestionSelect = (event: { suggestion: string; }) => {
    console.log(event.suggestion);
    setSearchVal(event.suggestion);
    setSuggestions(allSuggestions.filter(v => v === event.suggestion))
  };
  // const filteredPokemons = pokemons
  const filteredPokemons = useMemo(() => pokemons
    .filter(v => suggestions.includes(v.name))
    .sort((a, b) => {
      switch (sortVal.value) {
        case '4': // Z-A
          return b.name.localeCompare(a.name);
          break;
        case '3': // A-Z
          return a.name.localeCompare(b.name);
          break;
        case '2': // num DESC
          return b.id - a.id;
          break;
        case '1': // num ASC
        default:
          return a.id - b.id;
          break;
      }
    }), [
      suggestions,
      sortVal,
      pokemons
    ]);
  const onLoadMore = () => {
    if ((curPage * pageSize) < filteredPokemons.length) {
      setCurPage(curPage + 1);
    } else {
      setCurPage(Math.floor(filteredPokemons.length / pageSize));
    }
  }

  return (
    <>
      {!stylesReady && <Preloader />}
      <Grommet>
        <Box fill direction="row-responsive" align="center" justify="start" pad="large" gap="medium">
          <Select
            id="select"
            name="select"
            placeholder="Select"
            value={sortVal}
            options={sortOptions}
            onChange={({ option }) => setSortVal(option)}
          />
          <TextInput
            id="grommet-text-combobox"
            value={searchVal}
            onChange={onSearchChange}
            onSuggestionSelect={onSuggestionSelect}
            suggestions={suggestions}
            aria-label="Search Input Text"
            placeholder="Start typing to search..."
          />
        </Box>
      </Grommet>
      <Ul>
        {(pokemons => pokemons.map(v => (
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
            <CardLink href={`/pokemon/${v.name}`}></CardLink>
          </Card>
        )))(filteredPokemons.slice(0, curPage * pageSize))}
      </Ul>
      {
        (
          filteredPokemons.length > pageSize &&
          filteredPokemons.length > (curPage * pageSize)
        ) &&
        <Button onClick={onLoadMore}>Load More</Button>
      }
    </>
  )
}