# Research Results

## Requirements:
### Recipe Finder

1. We need to be able to search by a large list of ingredients according to a users pre-defined items they have available. The returned results should display the ingredients that are available as well as the ingredients that are missing (from users pre-defined list).
2. With the result of the ingredient search the user should be able to choose a recipe. Once the users clicks on the recipe, the API should provide us with an ID. With the ID we can request the recipe data/details (including instructions/steps) and return them to the user
3. Additional search parameters such as diet, exclude ingredients, ranking etc. are important to make sure users get tailored recipe suggestions. API should provide these additional search restrictions. However, can be restricted post-call from our side but would require extra work


**Spoonacular API capabilities vs Req's:**
1. Spoonacular provides search capabilities for recipes via a list of ingredients (searchByIngredients) and returns the following json format when called:

`       
"id": 1697525,
        "title": "6 Quick & Easy Smoothies To Start Your Morning",
        "image": "https://spoonacular.com/recipeImages/1697525-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 2,
        "missedIngredientCount": 2,
        "missedIngredients": [...],
        "usedIngredients": [...],
        "unusedIngredients": [...]
`

2. The results of the searchByIngredients search provides an ID to the recipe. If the user selects that recipe, we are able to create another API call that pulls the data containing the recipe details - watchout here is that some recipes do not have any steps/instructions. `"instructions": null,"` These will need to be ignored post-call.
3. The API has the functionality to add in additional parameters such as and other restrictions. These are saved as boolean values:

`"vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": true,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,` 
    
This should allow for the restriction of results down to recipes based on the users preferences.   
*WATCHOUT* we have been unable to get this to work so far, so we might have to restrict this on our end post-call.

### Ingredient Finder:
1. Since a user needs to input ingredients into their cabinet, it should be possible to search for them via the spoonacular API and return the results to the user that they can select and then place them into their cabinet. This will make sure we have the right spelling and wording in correspondance with how these ingredients are saved on the api side (and therefore corresponding to how they are spelled in the recipe search)

**Spoonacular API capabilities vs Req's:**
1. Technically this works, even with autocomplete. However, if the user types "sugar", the exact term sugar is returned as the 31st result. Even when utilizing their search parameters, these again don't work. Potentially due to the free version? This can be fixed by using .sort().