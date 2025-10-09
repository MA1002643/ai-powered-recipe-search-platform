<template>
  <h1 class="text-center mt-5">Dashboard</h1>
  <div class="d-flex justify-content-center">
    <button v-on:click="logout" type="button" class="btn btn-danger">Logout</button>
  </div>
  <div class="container text-center">
  <div class="row align-items-start">
    <div class="col">
      <div class="container" style="height: 100vh;border-style:solid;border-color:seagreen;border-radius: 20px;margin-top: 10%;background-color: darkcyan;overflow-y: scroll;overflow-x: hidden;">
        <div>
          <h4 style="font-family: monospace;font-weight: lighter;margin-top: 5%;text-decoration: underline;">Saved Recipes</h4>
        </div>
      <div class="container-md mt-5" style="background-color: cadetblue; width: 40vw;">
  <div class="row" v-for="item in savedRecipes">
    <div class="col-md-10">
      <router-link :to="'/recipes/' + item.saved_by" class="mt-5" style="text-decoration: none; display: flex; flex-wrap: wrap; align-items: center;">
        <div class="card text-bg-dark mb-2" style="flex: 1 1 0;">
          <div class="row g-0">
            <div class="col-md-4">
              <img v-bind:src="item.image" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">{{ item.directions }}</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-md-2 d-flex align-items-center mt-5">
      <button v-on:click="clicked(item.saved_id)" class="btn btn-danger" style="width: 50%;margin-left: -2vw;height: 80%;">X</button>
    </div>
  </div>
</div>

      </div>
    </div>
    <div class="col">
      <div class="container" style="height: 100vh;border-style:solid;border-color:seagreen;border-radius: 20px;margin-top: 10%;background-color: darkcyan;overflow-y: scroll;overflow-x: hidden;">
        <div>
          <h4 class="mb-3" style="font-family: monospace;font-weight: lighter;margin-top: 5%;text-decoration: underline;">My Recipes</h4>
        </div>
        <button v-on:click="createNewRecipe" type="button" class="btn btn-outline-dark">Create new Recipe</button>
        <div class="container-md mt-5" style="background-color: cadetblue; width: 40vw;">
        <div v-for="recipe in usersRecipes">

      <router-link :to="'/recipes/' + recipe.recipe_id" class="mt-5" style="text-decoration: none; display: flex; flex-wrap: wrap; align-items: center;">
        <div class="card text-bg-dark mb-2 mt-3" style="flex: 1 1 0;">
          <div class="row g-0">
            <div class="col-md-4">
              <img v-bind:src="recipe.image" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ recipe.title }}</h5>
                <p class="card-text">{{ recipe.directions }}</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { userService } from "../../services/users.service"
import { recipes } from "../../services/recipes.service"
export default {
  data(){
    return{
      savedRecipes: [],
      usersRecipes: [],
      error: ""
    }
  },
  mounted(){
    //this.savedRecipes.directions.replace(/<b>/g, "");
    //this.savedRecipes.directions.replace(/<\/b>/g, ""); 
    recipes.getSavedRecipes()
    .then((results) => {
      this.savedRecipes.push(...results)
      for(const item of this.savedRecipes){
        const words = item.split(' ')
        const limitedWords = words.slice(0,10)
        const limitedText = limitedWords.join(' ')
        item.directions = limitedText
      }
    })
    .catch(error => this.error = error)

    recipes.getUsersRecipes()
    .then((results) => {
      this.usersRecipes.push(...results)
    })
    .catch(error => this.error = error)
  },
  methods:{
    logout(){
      this.$router.push("/login")
      userService.logout()
      .then(() => 
      location.reload())
    },
    clicked(id){
      recipes.deleteSavedRecipe(id)
      .then(() => 
      location.reload())
    },
    createNewRecipe(){
      this.$router.push("/createRecipe")
    }
  }
}
</script>
