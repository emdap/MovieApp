<template>
  <div class="detailHolder" id="details">
    <slot name="thumbnail">
    </slot>
    <slot name="title">
    </slot>
    <slot name="overview">
    </slot>
    <slot name="rating">
    </slot>
    <slot name="release">
    </slot>
    <button @click="addFav">
      Add to favorites
    </button>
    <button @click="$store.commit('toggleDetails')">
      Back
    </button>
  </div>
</template>


<script>

export default {
  name: 'DetailScreen',
  props: {
    movieId: Number
  },
  methods: {
    addFav () {
      this.$store.commit('pushFavoriteMovie')
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
