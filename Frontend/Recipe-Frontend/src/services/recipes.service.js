import axios from 'axios'
import { API_KEY } from '/Users/hamzahd/Documents/Uni/2nd Year/Block 2/Thematic Project/Recipe/config'

const getRecipe = (pantry_ingredients) => {
  const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  params: {
    ingredients: pantry_ingredients,
    number: '2',
    ignorePantry: 'true',
    ranking: '1'
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

return axios.request(options)
.then(response => { 
  const data = response.data
  const ids = data.map(item => item.id)
  return ids
})
.catch(error => {
	console.error(error)
  return []
});
}

const getRecipeDetails = (id) => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+id+'/information',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  return axios.request(options)
  .then(response => {
    const data = response.data
    const item = {
      id: id,
      title: data.title,
      image: data.image,
      instructions: data.instructions,
      information: "",
      summary: ""
    }
    const options2 = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+id+'/summary',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    return axios.request(options2).then(response => {
      const information = response.data.summary
      item.information = information
      if (information) {
        const summary = information.replace(/(<([^>]+)>)/gi, '')
        item.information = summary
        const words = summary.split(' ')
        const limitedWords = words.slice(0,15)
        const limitedText = limitedWords.join(' ')
        item.summary = limitedText
      }
      return item
    }).catch(error => {
      return error
    });
  }).catch(error => {
    console.error(error);
    return []
  });
}
const saveRecipe = (id,image,title,ingredients,directions,date,created_by) => {
  return fetch("http://localhost:3333/recipeSave",
  {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-Authorization": localStorage.getItem("session_token")
      },
      body: JSON.stringify({
          "recipe_id": id,
          "image": image,
          "title": title,
          "ingredients": ingredients,
          "directions": directions,
          "date_published": date,
          "created_by": created_by
      })
  })
  .then((response) => {
      if(response.status === 201){
          return response.json()
      }else if(response.status === 400){
          throw "Duplicate Data"
      }else{
          throw "Something went wrong"
      }
  })
  .catch((error) => {
      console.log("Err",error)
      return Promise.reject(error)
  })
}

const getSavedRecipes = () => {
  return fetch("http://localhost:3333/recipeSave",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}
const deleteSavedRecipe = (id) =>{
  return fetch("http://localhost:3333/recipeSave/"+id,
  {
      method: "DELETE",
      headers: {
          "X-Authorization": localStorage.getItem("session_token")
      }
  })
  .then((response) => {
      if(response.status === 200){
          return;
      }else if(response.status === 401){
          throw "Must be logged in to delete"
      }else{
          throw "Server err"
      }
  })
  .catch((error) => {
      console.log('Err', error)
      return Promise.reject(error)
  })
}

const getUsersRecipes = () => {
  return fetch("http://localhost:3333/recipesByUser",
  {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token")
    }
})
.then((response) => {
    if(response.status === 200){
        return response.json()
    }else{
        throw "Something went wrong"
    }
})
.then((resJson) => {
    return resJson
})
.catch((error) => {
    console.log("Err", error)
    return Promise.reject(error)
})
}

export const recipes = {
    getRecipe,
    getRecipeDetails,
    saveRecipe,
    getSavedRecipes,
    deleteSavedRecipe,
    getUsersRecipes
}
