import React, { Fragment } from 'react';
import { PokemonList } from './components/PokemonList/PokemonList';
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Fragment>
        <header>
          Pokemons Catalog
        </header>
        <main>
          <Route path="/pokemons/:page" component={PokemonList} />
        </main>
        <footer>
          © 2019
        </footer>
      </Fragment>
    </BrowserRouter>
  )
}

export default App;
