import React from 'react';
import './main.css';

function ReactPokemon({ name, image, type, id }) {
  return (
    <div className="pokemon-card" id={`card-${id}`}>
      <img className="pokemon-image" src={image} alt={`${name} sprite`} />
      <div className="pokemon-info">
        <h2 className="pokemon-name">{name}</h2>
        <p className="pokemon-type">{type}</p>
      </div>
    </div>
  );
}

export default ReactPokemon;