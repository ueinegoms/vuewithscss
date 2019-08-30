<template>
  <div id="app">
    <div id="nav">
      <router-link :class="$route.path == '/' ? 'navLink navAtivo' : 'navLink'" tag="span" to="/"><i class="material-icons navIcon">people</i> <span>Proprietários</span></router-link>
      <router-link :class="checkForRoute('/properties') ? 'navLink navAtivo' : 'navLink'" tag="span" to="/properties"><i class="material-icons navIcon">gps_fixed</i> <span>Propriedades</span></router-link>
    </div>
    <router-view id="content" />
  </div>
</template>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

<script>
export default {
  methods: {
    checkForRoute: function(route){
      let routeRegEx = new RegExp(route, "g");
      let match = this.$route.path.match(routeRegEx);
      if (match != null){
        return true;
      } else {
        return false;
      }
    },
    
  }
}
</script>