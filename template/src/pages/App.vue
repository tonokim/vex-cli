<template>
  <div id="app">
    app <span  @click="increment1">{{count}}</span>
    <input type='text' v-model="message" />
    <span>{{message}}</span>
    <p>{{text}}</p>
    <input type='text' @input="onChange1"/>
    <button @click="setTextAsync">change</button>
    <!-- <p>Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.</p>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button> -->
    <router-view/>
    <router-link to="/page1">Go to Page1</router-link>
    <router-link to="/page2">Go to Page2</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      count: 0,
      message: ''
    }
  },
  computed: mapState({
    text: state => state.app.text
  }),
  // computed: mapGetters([
  //   'evenOrOdd'
  // ]),
  methods: {
    ...mapActions('app', [
      'setText',
      'setTextAsync',
    ]),
    // ...mapActions([
    //   'increment',
    //   'decrement',
    //   'incrementIfOdd',
    //   'incrementAsync'
    // ]),
    increment1 () {
      this.count++
    },
    onChange1(e){
      this.setText(e.target.value)
      console.log(this)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
