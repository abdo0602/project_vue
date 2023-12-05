<template>
  <nav id="links">
    <router-link to="/">User</router-link>
    <router-link to="/admin">Admin</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <div class="myapp">
    <router-view/>
  </div>
</template>

<style>
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#myapp{
  position: absolute;
  top: 10%;
  left: 0;
  height: 80%;
  width: 20%;
}
#links{
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#links a {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 20px;
  width: 50px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
