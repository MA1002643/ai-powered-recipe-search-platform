const getFeed = () => {
    return fetch("http://localhost:3333/recipes",
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

const getOne = (recipe_id) => {
    return fetch("http://localhost:3333/recipes/"+recipe_id,
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

const postTo = (title,ingredients,directions,image) => {
    return fetch("http://localhost:3333/recipes",
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": localStorage.getItem("session_token")
        },
        body: JSON.stringify({
          "image": image,
          "title": title,
          "ingredients": ingredients,
          "directions": directions
      })
    })
    .then((response) => {
        if(response.status === 201){
            return response.json()
        }else if(response.status === 400){
            throw "Bad data provided"
        }else{
            throw "Something went wrong"
        }
    })
    .catch((error) => {
        console.log("Err",error)
        return Promise.reject(error)
    })
}

export const feedService = {
    getFeed,
    getOne,
    postTo
} 