import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../Pokemon/Pokemon';

const POKEMONS_PER_PAGE = 12;

const initialState = 'dict' in localStorage ? JSON.parse(localStorage.getItem('dict')) : {};

export function PokemonList ({ match }) {
  const page = +match.params.page;
  const [dict, setDict] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [pokemonCount, setPokemonCount] = useState(); //state & setState

  const fetchPokemons = () => {
    if (ids.every(id => dict[id])) return setLoading(false);

    const offset = (page - 1) * POKEMONS_PER_PAGE;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMONS_PER_PAGE}`)
      .then(res => res.json())
      .then(data => {
        const loadedDict = data.results.reduce((acc, curr) => {
          const id = +curr.url.slice(34, -1);
          acc[id] = {
            id,
            name: curr.name,
            catched: false
          }
          return acc;
        }, {});
        const updatedDict = { ...dict, ...loadedDict };
        setDict(updatedDict);
        setPokemonCount(data.count);
      })
      .finally(() => setLoading(false));
  }

  const catchPokemon = (id) => {
    const updatedDict = {
      ...dict,
      [id]: {
        ...dict[id],
        catched: !dict[id].catched
      }
    };
    setDict(updatedDict);
  }

  useEffect(() => fetchPokemons(), [match]); // componentDidUpdate

  const handler = useCallback(() => {
    if ('dict' in localStorage) {
      const updatedDict = JSON.parse(localStorage.getItem('dict'));
      setDict(updatedDict);
    }
  }, []); // this.handler

  useEffect(() => {
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [handler]); // componentDidMount & componentWillUnmount;

  useEffect(() => {
    localStorage.setItem('dict', JSON.stringify(dict));
  }, [dict]);

  const ids = Array.from(
    { length: POKEMONS_PER_PAGE },
    (_, i) => (page - 1) * POKEMONS_PER_PAGE + 1 + i
  );
  const list = ids.map(id => dict[id]);

  const catchedCount = Object.values(dict).filter(curr => curr.catched).length;
  const lastPage = Math.ceil(pokemonCount / POKEMONS_PER_PAGE);

  return ( 
    <div>
      <span>Catched: {catchedCount}</span>
      {loading
        ? 'Loading'
        : (
        <div className='pokemons'>
          {list.map(pokemon => pokemon && (
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              catched={pokemon.catched}
              catchPokemon={catchPokemon}
            />
        ))}
        </div>
      )}
      {page !== 1 && <Link to={`/pokemons/${page - 1}`}>Prev</Link>}
      {page !== lastPage && <Link to={`/pokemons/${page + 1}`}>Next</Link>}
    </div>
  );
}







