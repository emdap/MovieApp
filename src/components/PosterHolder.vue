 <template>
    <div id="posterHolder" :class="holderClass">
      <MoviePoster v-for="(movie, index) in activeCat.movies" :key="index" :movie="movie"/>
      <div class="noMovie" v-if="activeCat.movies.length === 0">
        No movies here yet :(
      </div>
    </div>
</template>

<script>
import MoviePoster from '@/components/MoviePoster'

export default {
  name: 'PosterHolder',
  components: {
    MoviePoster
  },
  props: {
    activeCat: Object,
    haveScroll: Boolean
  },
  data () {
    return {
      holderClass: 'default',
      holderId: 'posterHolder',
      scrollable: true
    }
  },
  watch: {
    activeCat: function () {
      this.fadeHolder(100)
    },
    haveScroll: function () {
      // issue on iOS with detail screen not being scrollable
      // but instead will scroll the poster holder in the background, need to disable scrolling
      document.getElementById(this.holderId).style.overflowY = (this.haveScroll) ? "scroll" : "hidden"
    }
  },
  methods: {
    fadeHolder: function (timeout) {
      this.holderClass = 'fade'
      setTimeout(() => {
        document.getElementById(this.holderId).scrollTop = 0
        this.holderClass = 'default'
      }, timeout)
    },
    handleScroll: function () {
      // for getting more movies on hitting bottom of screen
      var oh = document.getElementById(this.holderId).offsetHeight
      var sh = document.getElementById(this.holderId).scrollHeight
      var st = document.getElementById(this.holderId).scrollTop
      // load more content once scrolled almost to bottom
      if (this.activeCat.id != 3 && st + oh >= sh - 100) {
        this.$store.dispatch('fetchMovies', this.activeCat.id)
      }
    }
  },
  mounted () {
    document.getElementById(this.holderId).addEventListener('scroll', this.handleScroll);
    this.fadeHolder(500)
  }
}

</script>

<style>

#posterHolder {
  position: absolute;
  height: calc(100% - 2.5rem);
  width: 100%;
  /*max-width: 810px;*/
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  /* for firefox */
  scrollbar-width: thin;
  z-index: 2;
  top: 2.5rem;
  left: 0;
  transition: all .3s;
}

#posterHolder.default {
  opacity: 100;
  transition: opacity .2s;
}

#posterHolder.fade {
  opacity: 0;
  transition: opacity 0s;
}

.noMovie {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color: grey;
}

</style>
