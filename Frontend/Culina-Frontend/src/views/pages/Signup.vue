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
              <div class="col-xl-6 d-none d-xl-block">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/delish-190814-mcdonalds-apple-pies-0283-portrait-pf-1566604978.jpg"
                  alt="Sample photo"
                  class="img-fluid"
                  style="border-top-left-radius: 0.25rem;
                    border-bottom-left-radius: 0.25rem;"
                />
              </div>
              <div class="col-xl-6">
                <div class="card-body p-md-5 text-black">
                  <h3 class="mb-5 text-uppercase text-center font-weight-bold">
                    RF Registration Form
                  </h3>
                  <p class="text-white-50 mb-5 text-center">
                    Please create your account
                  </p>

                  <div>
                    <div class="row">
                      <div class="form-white col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            class="form-control form-control-lg"
                            placeholder="First Name"
                            name="first_name"
                            v-model="first_name"
                          />
                          <label
                            class="form-label"
                            for="form3Example1m"
                          ></label>
                          <div v-show="submitted && !first_name">
                            This is a required field
                          </div>
                        </div>
                      </div>
                      <div class="form-white col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form3Example1n"
                            class="form-control form-control-lg"
                            placeholder="Last Name"
                            name="last_name"
                            v-model="last_name"
                          />
                          <label
                            class="form-label"
                            for="form3Example1n"
                          ></label>
                          <div v-show="submitted && !last_name">
                            This is a required field
                          </div>
                        </div>
                      </div>
                    </div>

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
                      <div v-show="email && !isValidEmail">
                        please enter a valid email
                      </div>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        v-model="password"
                      />
                      <label class="form-label" for="typePasswordX"></label>
                      <div v-show="submitted && !password">
                        This is a required field
                      </div>
                    </div>

                   <!--  <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        placeholder="Re-enter Password"
                        name="Re-enter Password"
                        v-model="Reenterpassword"
                      />
                      <label class="form-label" for="typePasswordX"></label>
                      <div v-show="submitted && !Reenterpassword">
                        This is a required field
                      </div>
                    </div> -->

                    <div class="d-flex justify-content-around pt-3">
                      <button
                        class="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Reset
                      </button>
                      <button
                        v-on:click="submit_form"
                        class="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Submit form
                      </button>
                    </div>
                    <div v-if="error">{{ error }}</div>
                  </div>
                </div>

                <div>
                  <p class="fs-4 mb-0 text-center">
                    Already have an account?
                    <router-link :to="{ path: '/login' }"
                      ><a>Log in</a></router-link
                    >
                  </p>
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
import * as EmailValidator from 'email-validator';
import { userService } from '../../services/users.service';
export default {
  data() {
    return {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      submitted: false,
      success: false,
      isValidEmail: true,
      error: ""
    };
  },
  methods: {
    submit_form(){
      this.submitted = true
      this.error = ""
      const {email,password,first_name,last_name} = this
      if(!(email && password && first_name,last_name)){
        return
      }

      if(!(EmailValidator.validate(email))){
        this.isValidEmail = false
        return
      }
      else{
        userService.createNewUser(first_name,last_name,email,password)
        .then(() => {
          this.success = true
          this.$router.push("/login")
        })
        .catch((err) => {
          this.error = err
        })
      }
    }
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
