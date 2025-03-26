const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = '';  // API Key

// Endpoint untuk mencari resep berdasarkan bahan
app.get('/search-recipe', async (req, res) => {
  const ingredients = req.query.ingredients || 'baking powder';  // Ambil bahan dari query parameter
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredients,
          number: 10,  // Ambil 10 resep
          apiKey: API_KEY,
        },
      }
    );
    res.json(response.data);  // Kirim data hasil API ke frontend
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari API' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
