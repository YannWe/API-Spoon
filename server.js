import express from "express";
import axios from "axios";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

//Get recipe by ingredients
app.get('/recipes/:query', async (req, res) => {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.params.query}&number=2&apiKey=${API_KEY}`
    );
    const data = response.data;
        console.log(data.length)
    
    const availableIngredients = data.map(items => {
        items.usedIngredients.map(item => {console.log(item.name)})
    });
    const missingIngredients = data.map(items => {
        items.missedIngredients.map(item => {console.log(item.name)})
    });
    res.json(data)
});  

// get recipe information by ID
app.get('/recipes/getrecipe/:id', async (req, res) => {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/${req.params.id}/information?&apiKey=${API_KEY}`
    );
    const data = response.data;
        console.log(data)
    res.json(data)
});  

// get recipe by complex search - beware: this is an exact search - if 1 ingredient is missing from the recipe, no results will appear
app.get('/recipes/complex/:query', async (req, res) => {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${req.params.query}&diet="vegetarian"&apiKey=${API_KEY}`
    );
    const data = response.data;
        console.log(data)
    res.json(data)
}); 

// get specific recipes instruction/steps
app.get('/recipes/instructions/:id', async (req, res) => {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/${req.params.id}/analyzedInstructions?&apiKey=${API_KEY}`
    );
    const data = response.data;
        console.log(data)
    res.json(data)
});

// search ingredients
app.get('/ingredients/:query', async (req, res) => {
    const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${req.params.query}&number=100&apiKey=${API_KEY}`
    );
    const data = response.data;
    const sortedIngredients = data.results.map(item => item.name).filter(name => name.includes(req.params.query)).sort();
        console.log(data)
    res.json(sortedIngredients)
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
