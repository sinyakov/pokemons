import React, { Fragment } from 'react';
import { PokemonList } from './components/PokemonList/PokemonList';


function App() {

  return (
    <Fragment>
      <header>
        Pokemons Catalog
      </header>
      <main>
        <PokemonList />
      </main>
      <footer>
        © 2019
      </footer>
    </Fragment>
  )
}

export default App;
