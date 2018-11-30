<template>
  <div class="posterHolder" :id="'movie' + movieID" @click="openDetails()">
    <slot name="posterImg">
    </slot>
  </div>
</template>


<script>

export default {
  name: 'MoviePoster',
  props: {
    movieID: Number
  },
  methods: {
    openDetails () {
      this.$store.commit('setActiveDetails', this.movieID)
      this.$store.commit('toggleDetails')
    }
  }
  // ,
  // methods: {
  //   async testData () {
  //     // const test = await this.$store.initApp()
  //     if (test.data) {
  //       console.log(test)
  //     }
  //   }
  // }
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
