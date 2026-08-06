<template>
    <h1 class="text-center mt-3">{{ title }}</h1>
    <div class="container text-center">
        <div class="row">
            <div class="col bg-black" style="height: 50vh;filter: opacity(20%);">
            </div>
            <div class="col" style="height: 50vh;">
                <img v-bind:src="image" class="img-fluid rounded-start" style="height: 50vh;" alt="...">
            </div>
            <div class="col bg-black" style="height: 50vh;filter: opacity(20%);">
            </div>
        </div>
        <div class="row">
            <div class="col-8 bg-white mt-5" style="height: 50vh;filter: opacity(30%);">
                <p class="font-weight-lighter text-secondary-color" >{{ information }}</p>
                <p class="font-weight-lighter text-secondary-color" >{{ instructions }}</p>
                <button v-on:click="">Back</button>
                <div v-if="error" class="m-3">
                    <p class="text-danger">{{ this.error }}</p>
                </div>
            </div>
            <div class="col bg-white mt-5" style="height: 50vh;filter:opacity(60%);">
                <h5 class="mt-3 mb-3">Ingredients</h5>
                <!-- <ul class="list-group" v-for="item in ingredients">
                    <li class="list-group-item mb-3">
                        <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"> 
                        <label class="form-check-label" for="firstCheckbox" style="font-weight: bold;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">{{ item }}</label>
                    </li>
                </ul> -->
            </div>
        </div>
</div>
</template>
<script>
import { feedService } from '../../services/feed.service'
import { recipes } from '../../services/recipes.service'
export default {
    name: 'Recioe_modal',
    props:{
        image: String,
        title: String,
        information: String,
        instructions: String
    },
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
}
</script>