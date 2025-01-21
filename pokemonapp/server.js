import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files like HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assessment2.html'));
});

// API route to fetch Pokémon data from PokeAPI
app.get('/pokemon/:name', async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    const pokemonInfo = {
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,  // Front sprite image
      types: data.types.map(type => type.type.name).join(', '),
      height: data.height,
      weight: data.weight,
    };

    res.json(pokemonInfo);
  } catch (error) {
    res.status(404).json({ error: "Pokémon not found!" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
