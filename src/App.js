import React, { useState, useEffect } from 'react';
import Pokemon from './components/main';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
      .then(response => response.json())
      .then(data => {
        const pokemonData = data.results.map(async (result) => {
          const response = await fetch(result.url);
          const data = await response.json();
          return {
            name: data.name,
            image: data.sprites.front_default,
            type: data.types.map(t => t.type.name).join(', ')
            // power: data.stats.find(s => s.stat.name === 'attack').base_stat
          }
        });
        Promise.all(pokemonData).then(setPokemonList);
      })
      .catch(error => console.log(error));
  }, []);

  const filteredPokemon = pokemonList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="pokemon">
      <h1>Pokemon Types</h1>
      <input type="text" placeholder="Search Pokemon types" value={searchTerm} onChange={handleSearch} />
      <div className="pokemon-types">
        {filteredPokemon.map((pokemon, i) => (
          <Pokemon
            key={i}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.type}
            power={pokemon.power}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
