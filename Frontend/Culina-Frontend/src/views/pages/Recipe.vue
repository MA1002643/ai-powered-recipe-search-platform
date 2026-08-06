<template>
    <h1 class="text-center mt-3">{{ recipe.title }}</h1>
    <div class="container text-center">
        <div class="row">
            <div class="col bg-black" style="height: 50vh;filter: opacity(20%);">
            </div>
            <div class="col" style="height: 50vh;">
                <img v-bind:src="recipe.image" class="img-fluid rounded-start" style="height: 50vh;" alt="...">
            </div>
            <div class="col bg-black" style="height: 50vh;filter: opacity(20%);">
            </div>
        </div>
        <div class="row">
            <div class="col-8 bg-white mt-5" style="height: 50vh;filter: opacity(30%);">
                <p class="small">created by: {{ recipe.created_by }}</p>
                <p class="small">{{ recipe.date_edited }}</p>
                <p class="font-weight-lighter text-secondary-color" style="font-family:'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif;font-size: larger;">{{ recipe.directions }}</p>
                <button v-on:click="SaveRecipes">Save</button>
                <div v-if="error" class="m-3">
                    <p class="text-danger">{{ this.error }}</p>
                </div>
            </div>
            <div class="col bg-white mt-5" style="height: 50vh;filter:opacity(60%);">
                <h5 class="mt-3 mb-3">Ingredients</h5>
                <ul class="list-group" v-for="item in ingredients">
                    <li class="list-group-item mb-3">
                        <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"> 
                        <label class="form-check-label" for="firstCheckbox" style="font-weight: bold;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">{{ item }}</label>
                    </li>
                </ul>
            </div>
        </div>
</div>
</template>
<script>
import { feedService } from '../../services/feed.service'
import { recipes } from '../../services/recipes.service'
export default {
    data(){
        return{
            success: false,
            recipe: { loading: true},
            error: "",
            ingredients: [],
            savedRecipes: [],
            ids: []
        }
    },
    mounted(){
        feedService.getOne(this.$route.params.id)
        .then((recipe) => {
            this.recipe = recipe
            this.recipe.loading = false
            this.ingredients = this.recipe.ingredients.split(",")
        })
        .catch(error => this.error = error)

        recipes.getSavedRecipes()
        .then((recipe) => {
            this.savedRecipes = recipe
        }).catch(error => this.error = error)
    },
    methods:{
        SaveRecipes(){
           recipes.saveRecipe(
                    this.recipe.recipe_id,
                    this.recipe.image,
                    this.recipe.title,
                    this.recipe.ingredients,
                    this.recipe.directions,
                    this.recipe.date_edited,
                    this.recipe.created_by
                )
                .then(() => {
                    this.success = true
                    this.$router.push("/dashboard")
                })
                .catch((err) => {
                    this.error = err
                }) 
        }
    }
}
</script>
<style>
</style>