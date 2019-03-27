import React from 'react';

Pokemon.defaultProps = {
  name: 'no name'
}

export function Pokemon({ id, name, catched, catchPokemon }) {
  const imgUrl = `/sprites/${id}.png`;

  const handleClick = () => {
    catchPokemon(id);
  }
  
  return (
    <div className="pokemon">
      <h2 className="pokemin__name">{name}</h2>
      <button onClick={handleClick}>{catched ? 'Отпустить' : 'Поймать'}</button>
      <img className="pokemon__img" src={imgUrl}></img>
      <div className="pokemon__id">{id}</div>
    </div>
  );
}
