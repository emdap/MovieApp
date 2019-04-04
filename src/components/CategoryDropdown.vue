<template>
  <div id="catDropHolder">
    <b-dropdown id="catDrop" :text="activeCat" class="m-md-2">
      <b-dropdown-item v-for="(category, index) in $store.state.movieCategories" :key="index" @click="setActiveCat(category.id)" 
      :class="{'active' : category.active}">
        {{category.category}}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'DetailScreen',
  props: {
    activeCat: String
  },
  methods: {
    // tells the store to set this category as active, set all others as not
    setActiveCat (catId) {
      this.$store.commit('setActiveCategory', catId)
    }
  }
}
</script>

<style scoped>
/* bootstrap buttons/dropdown has styling in App.vue */
#catDrop{
  z-index: 5;
  position: fixed;
  top: 0;
}
</style>
