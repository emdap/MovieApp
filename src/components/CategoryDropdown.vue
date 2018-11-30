<template>
  <div>
    <b-dropdown id="ddown1" text="Dropdown Button" class="m-md-2">
      <b-dropdown-item v-for="(category, index) in $store.state.movieCategories" :key="index" @click="setActiveCat(category.id)" :class="{'active' : category.active}">{{category.category}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
  name: 'DetailScreen',
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    setActiveCat (catId) {
      this.$store.commit('setActiveCategory', catId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
