<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            class="card"
            style="border-radius: 1rem; background-color: #146166"
          >
            <div
              class="card-body p-5 text-center"
              style="box-shadow: 3px 8px 20px 10px #a8c7ae"
            >
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <form @submit.prevent="handleSubmit">
                  <div class="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      name="email"
                      v-model="email"
                    />
                    <label class="form-label" for="typeEmailX"></label>
                    <div v-show="submitted && !email">
                      This is a required field
                    </div>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      name="Password"
                      v-model="password"
                    />
                    <label class="form-label" for="typePasswordX"></label>
                    <div v-show="submitted && !password">
                      This is a required field
                    </div>
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-white-50" href="#!">Forgot password?</a>
                  </p>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                  <div v-if="error">{{ error }}</div>
                </form>
              </div>

              <div>
                <p class="mb-0 fs-4">
                  Don't have an account?
                  <router-link :to="{ path: '/signup' }"><a>Sign up</a></router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as EmailValidator from 'email-validator'
import { userService } from '../../services/users.service'
export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      error: ""
    };
  },
  methods: {
    handleSubmit(b) {
      this.submitted = true;
      this.error = "";
      const {email,password} = this
      if(!(email && password)){
        return
      }

      if(!(EmailValidator.validate(email))){
        this.error = "Email must be a valid email"
        return 
      }
      const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if((password_pattern.test(password)) == false){
        this.error = "Password not strong enough"
        return;
      }
      else{
        userService.login(email,password)
        .then(result => {
          this.$router.push("/dashboard")
          .then(() => 
            location.reload())
        })
        .catch(error => {
          this.error = error 
          this.loading = false
        })
      }
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
</style>
