<template>
  <div id="app">
    <div id="nav">
      <router-link :class="$route.path == '/' || checkForRoute('/grower') ? 'navLink navAtivo' : 'navLink'" tag="span" to="/"><i class="material-icons navIcon">people</i> <span>Proprietários</span></router-link>
      <router-link :class="checkForRoute('/properties') ? 'navLink navAtivo' : 'navLink'" tag="span" to="/properties"><i class="material-icons navIcon">gps_fixed</i> <span>Propriedades</span></router-link>
    </div>
    <router-view id="content" @loading="e => {this.isLoading = e}"/>
    <Loading :showTag="isLoadingComputed" />
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
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  computed: {
      isLoadingComputed() {
          // return this.$store.state.alert;
          if (this.isLoading) {
              return "showing";
          } else {
              return "";
          }
      }
  },
  data: function(){
    return { 
      isLoading: false,
    }
  },
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