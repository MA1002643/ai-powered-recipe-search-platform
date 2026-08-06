<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand font-weight-bold" style="color: #a8c7ae;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;font-size:3vh;font-weight: bold;" href="#">Recipe finder</a>
      </div>
      <router-link class="navbar-link" style="text-decoration:none; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;font-size:2.7vh; font-weight: lighter; font-variant: small-caps;" to="/">
        h o m e
      </router-link>
      <router-link class="navbar-link" style="text-decoration: none; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;font-size:2.7vh; font-weight: lighter;font-variant: small-caps;" to="/feed"
        >f e e d
        </router-link>
      <router-link class="navbar-link" style="text-decoration:none; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;font-size:2.7vh; font-weight:lighter; font-variant: small-caps;" to="/dashboard"
        >d a s h b o a r d</router-link
      >
      <div class="nav navbar-nav navbar-right">
        <router-link
          class="navbar-link"
          style="text-decoration: none"
          to="/login"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
            color="#2C2628"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </nav>

  <router-view />
</template>
<style>
.navbar {
  background: #0e464a;
  box-shadow: 0 6px 20px 0 #6ca678;
}

.navbar-link {
  color: #6ca678;
}

.navbar-link:hover {
  color: #2c2628;
}
</style>
