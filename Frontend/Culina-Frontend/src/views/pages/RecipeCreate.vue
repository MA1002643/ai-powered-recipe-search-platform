<template>
  <section class="h-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div
            class="card card-registration my-4"
            style="
              border-radius: 1rem;
              background-color: #146166;
              box-shadow: 20px 20px 20px 20px #a8c7ae;
            "
          >
            <div class="row g-0">
              <div class="col-xl-6">
                <div class="card-body p-md-5 text-black">
                  <h3 class="mb-5 text-uppercase text-center font-weight-bold">
                    RF Reciepe Form
                  </h3>
                  <p class="text-white-50 mb-5 text-center">
                    Register a new Recepie
                  </p>

                  <form @submit.prevent="handleSubmit">
                    <div class="form-outline form-white mb-4">
                      <input
                        type="Title"
                        id="text"
                        class="form-control form-control-lg"
                        placeholder="Title"
                        name="Title"
                        v-model="title"
                      />
                      <label class="form-label" for="text"></label>
                      <div v-show="submitted && !title">
                        This is a required field
                      </div>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="Ingredients"
                        id="text"
                        class="form-control form-control-lg"
                        placeholder="Ingredients"
                        name="Ingredients"
                        v-model="ingredients"
                      />
                      <label class="form-label" for="text"></label>
                      <div v-show="submitted && !ingredients">
                        This is a required field
                      </div>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="Directions"
                        id="text"
                        class="form-control form-control-lg"
                        placeholder="Directions"
                        name="Directions"
                        v-model="directions"
                      />
                      <label class="form-label" for="Directions"></label>
                      <div v-show="submitted && !directions">
                        This is a required field
                      </div>
                    </div>
                    <div class="form-outline form-white mb-2">
                      <input
                        type="text"
                        id="text"
                        class="form-control form-control-lg"
                        placeholder="Image - URL"
                        name="Image"
                        v-model="image"
                      />
                      <label class="form-label" for="Directions"></label>
                      <div v-show="submitted && !image">
                        This is a required field
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mb-3 pt-3">
                      <button
                        class="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Post
                      </button>
                    </div>
                    <div v-if="error">{{ error }}</div>
                  </form>

                  <h1>Reciepe By User</h1>
                  <hr class="style1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { feedService } from '../../services/feed.service'
export default {
  data() {
    return {
      error:"",
      image:"",
      title: "",
      ingredients: "",
      directions: "",
      email: "",
      password: "",
      submitted: false,
    };
  },
  methods: {
    handleSubmit(b) {
      feedService.postTo(this.title,this.ingredients,this.directions,this.image)
      .then(() => {
        this.$router.push('/dashboard')
      })
      .catch(error => this.error = error)
    },

  },
};
</script>
<style>
.form {
  margin-top: 120px;
}

section {
  color: #2c2628;
}

hr.style1 {
  border-top: 1px solid black;
}
</style>
