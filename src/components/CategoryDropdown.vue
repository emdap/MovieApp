<template>
  <div>
    <b-dropdown id="catDrop" :text="activeCategory" class="m-md-2">
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
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    activeCategory: function () {
      return this.$store.state.movieCategories.find((x) => {
        return x.active
      }).category
    }
  },
  methods: {
    setActiveCat (catId) {
      this.$store.commit('setActiveCategory', catId)
    }
  }
}
</script>

<style scoped>
/* bootstrap buttons/dropdown has styling in App.vue */
</style>
