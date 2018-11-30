<template>
  <div class="detailHolder" id="details">
    <slot name="thumbImg">
    </slot>
    <slot name="title">
    </slot>
    <slot name="overview">
    </slot>
    <slot name="rating">
    </slot>
    <slot name="release">
    </slot>
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
  // props: {
  //   movie: Object
  // },
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
