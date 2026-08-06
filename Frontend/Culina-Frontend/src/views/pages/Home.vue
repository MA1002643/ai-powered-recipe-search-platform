<template>
<!-- <div v-if="show === false"> -->
  <h1 class="text-center mt-5">Home</h1>
  <p class="text-center">Search through our vast database of recipes using JUST items in your pantry</p>
  <div class="container-md mt-3 bg-dark">
    &nbsp;
    <div>
        <form v-on:submit.prevent="data_input">
          <input v-model="query" type="text" class="form-control" id="specificSizeInputName" placeholder="Enter one pantry item ..." />
        </form>
        &nbsp;
    </div>
    <div class="row">
      <div v-for="ingredient in ingredients" :key="ingredient" class="col-md-2 col-sm-2 col-lg-2">
        <div class="card mb-3" style="width: fit-content;">
          <div class="card-body" style="padding: 5px; display: flex; align-items: center; justify-content: space-between;">
                <h5 class="card-title mr-2" style="font-size: 13px;">{{ ingredient }}</h5>
                <button v-on:click="delete_ingredient(ingredient)" type="button" class="btn btn-danger" style="margin-left: 5px; font-size: 10px;">X</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.ingredients.length >= 1" class="d-flex justify-content-center">
      <button v-on:click="search()" type="button" class="btn btn-outline-light mb-3">Search</button>
    </div>
   </div>
   <div class="container-md">
  <div class="row">
    <a v-for="item in items" class="mt-3" style="text-decoration: none;">
      <div class="card text-bg-dark mb-2">
        <div class="row g-0">
          <div class="col-md-4">
            <img v-bind:src="item.image" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.summary }} . . . .</p>
              <button v-on:click="SaveRecipe(item.image,item.title,item.instructions,item.information,item.id)" type="button" class="btn btn-outline-success w-100 p-0">+</button>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
<!-- </div> -->
<!-- <div v-if="show === true">
<recipe_modal :image="current_image" 
              :title="current_title"
              :information="current_info"
              :instructions="current_inst"/>
</div> -->
</template>
<script>
import { recipes } from '../../services/recipes.service'
import recipe_modal from '../components/recipe_modal.vue'
export default {
  data(){
    return{
      ingredients: [],
      items: [],
      query: '',
/*       current_title: "",
      current_image: "",
      current_info: "",
      current_inst: "",
      show: false */
    }
  },
  methods: {
    /* recipe_show(title,image,info,inst){
      this.current_image = image
      this.current_title = title
      this.current_info = info
      this.current_inst = inst
      this.show = true

    }, */
    search(){
      recipes.getRecipe(this.ingredients.join(','))
      .then(ids => {
        ids.forEach(id_ => {
          recipes.getRecipeDetails(id_)
          .then(item => {
            this.items.push(item)
            console.log(this.items)
          })
          .catch(error => {
            console.error(error)
          })
        })
      })
      .catch(error => {
        console.error(error)
      })
    },
    data_input(){
      this.ingredients.push(this.query)
      this.query = ''
    },
    delete_ingredient(ingredient){
      const index = this.ingredients.indexOf(ingredient)
      if (index !== -1){
        this.ingredients.splice(index,1)
      }
    },
    SaveRecipe(image,title,ingredients,directions,created_by){
      console.log(image,title,ingredients,directions,created_by)
            recipes.saveRecipe(null,image,title,ingredients,directions,null,created_by)
            .then(() => {
                this.$router.push("/dashboard")
            })
            .catch((err) => {
                this.error = err
            }) 
        }
  },
  components: {
    recipe_modal
  }
}
</script>
<style>
body {
  background-color: #146166;
}
.container-md {
  margin-top: 10vh;
  width: 50vw;
  border-radius: 20px;
}
</style>
