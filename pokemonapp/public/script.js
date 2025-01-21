// Fetching Pokémon data from the API
async function fetchPokemon() {
  const name = document.getElementById('pokemonName').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPokemonInfo(data);
  } catch (error) {
    alert('Pokémon not found!');
  }
}

// Function to display Pokémon information in the main info section
function displayPokemonInfo(pokemon) {
  const pokemonInfo = document.getElementById('pokemonInfo');
  pokemonInfo.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
  `;
}

// Function to generate random Pokémon and display them as clickable items
async function generateRandomPokemon() {
  const randomIds = Array.from({ length: 20 }, () => Math.floor(Math.random() * 898) + 1); // Get 20 random Pokémon IDs
  const randomPokemon = await Promise.all(randomIds.map(id => fetchPokemonData(id)));
  const randomPokemonList = document.getElementById('random-pokemon-list');

  randomPokemonList.innerHTML = '';
  randomPokemon.forEach(pokemon => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon-card');
    pokemonDiv.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>${pokemon.name}</p>
    `;
    pokemonDiv.onclick = () => displayPokemonInfo(pokemon);
    randomPokemonList.appendChild(pokemonDiv);
  });
}

// Function to fetch data for a specific Pokémon by ID
async function fetchPokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Generate random Pokémon on page load
generateRandomPokemon();
