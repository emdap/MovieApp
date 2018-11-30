<template>
  <div class="detailHolder" id="details">
    <img :src="$store.state.activeDetails.thumbURL">
    <h1>
      {{$store.state.activeDetails.originalTitle}}
    </h1>
    <h2>
      {{$store.state.activeDetails.overview}}
    </h2>
    <h3>
      {{$store.state.activeDetails.rating}}
    </h3>
    <h4>
      {{$store.state.activeDetails.releaseDate}}
    </h4>
    <button v-if="!$store.state.activeDetails.favorite" @click="addFav">
      Add to favorites
    </button>
    <button v-else="!$store.state.activeDetails.favorite" @click="removeFav">
      Remove from favorites
    </button>
    <button @click="$store.commit('toggleDetails')">
      Back
    </button>
  </div>
</template>


<script>

export default {
  name: 'DetailScreen',
  methods: {
    addFav () {
      this.$store.commit('pushFavoriteMovie', this.$store.state.activeDetails)
    },
    removeFav () {
      this.$store.commit('removeFavoriteMovie', this.$store.state.activeDetails)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
