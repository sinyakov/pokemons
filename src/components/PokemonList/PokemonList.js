import React, { useState } from 'react';
import { Pokemon } from '../Pokemon/Pokemon';

// export class PokemonList extends React.Component {
//   constructor() {
//     this.state = {
//       list: []
//     }
//     this.fetchPokemons = this.fetchPokemons.bind(this);
//   }

//   fetchPokemons() {
//     fetch('https://pokeapi.co/api/v2/pokemon')
//       .then(res => res.json())
//       .then(data => this.setState({ list: data.rusults }));
//   }

//   render() {    
//     return (
//       <div>
//         <button onClick={this.fetchPokemons}>load pokemons</button>
//         <div className='pokemons'>
//           {this.state.list.map(pokemon => <Pokemon id={pokemon.id} name={pokemon.name} />)}
//         </div>
//       </div>
//     );
//   }
// }

const POKEMONS_PER_PAGE = 12;

export function PokemonList () {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = () => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page * POKEMONS_PER_PAGE}&limit=${POKEMONS_PER_PAGE}`)
      .then(res => res.json())
      .then(data => {
        const loadedList = data.results.map(curr => {
            return {
                name: curr.name,
                id: +curr.url.slice(34, -1),
                catched: false
            }
        })
        setList([...list, ...loadedList]);
        setPage(page + 1);
      })
      .finally(() => setLoading(false));
  }

  const catchPokemon = (id) => {
    const updated = list.map(curr => {
        if(curr.id === id) {
            return {
                ...curr,
                catched: !curr.catched
            }
        }
        return curr;
    })
    setList(updated);
  }

  const catchedCount = list.filter(curr => curr.catched).length;

  return (
    <div>
      <button disabled={loading} onClick={fetchPokemons}>load pokemons</button>
      <span>Catched: {catchedCount}</span>
      <div className='pokemons'>
        {list.map(pokemon => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            catched={pokemon.catched}
            catchPokemon={catchPokemon}
          />
        ))}
      </div>
    </div>
  );
}







