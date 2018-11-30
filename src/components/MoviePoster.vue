<template>
  <div class="posterHolder" :id="'movie' + movieId" @click="openDetails">
    <slot name="posterImg">
    </slot>
  </div>
</template>


<script>

export default {
  name: 'MoviePoster',
  props: {
    movieId: Number
  },
  methods: {
    openDetails () {
      console.log('here')
      this.$store.commit('setActiveDetails', this.movieId)
      this.$store.commit('toggleDetails')
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
