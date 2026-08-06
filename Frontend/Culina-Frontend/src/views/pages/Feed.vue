<template>
    <h1 class="text-center mt-5">Feed</h1>
 <div class="container-md" style="background-color: cadetblue; width: 55vw;">
  <div class="row">
    <router-link :to="'/recipes/' + item.recipe_id" v-for="item in feedItems" class="mt-5" style="text-decoration: none;">
      <div class="card text-bg-dark mb-2">
        <div class="row g-0">
          <div class="col-md-4" >
            <img v-bind:src="item.image" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.directions }}</p>
              <p class="card-text"><small class="text-body-secondary">{{ item.date_edited }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
 </div>
</template>
<script>
import { feedService } from '../../services/feed.service'
export default {
    data(){
        return{
            feedItems: [],
            error:""
        }
    },
    mounted(){
        feedService.getFeed()
        .then(feed => {
            this.feedItems = feed
        })
        .catch(error => this.error = error)
    },
    methods:{
    }
}
</script>
<style>

</style>