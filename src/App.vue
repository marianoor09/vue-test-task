<template>


<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			 
				<ul class="navbar-nav justify-content-center mr-auto mt-2 mt-lg-0">
				  <li class="nav-item">
            <router-link class="nav-link" to="/">Chart</router-link>
				  </li>
				  <li class="nav-item">
            <router-link class="nav-link" to="/table">Table</router-link>
				  </li>
				</ul>

</nav>
<router-view></router-view>
</template>
<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
