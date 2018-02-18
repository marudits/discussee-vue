<template>
  <div id="app" class="app">
    <header class="app-header">
      <i class="power icon" v-on:click="signOut()"></i>
      <router-link :to="`/`">
        <h1>
          <i class="comments icon"></i>Discussee
        </h1>
      </router-link>
      <h5>{{ username }}</h5>
    </header>
    <content class="app-content">
        <router-view/>
    </content>
    <footer class="app-footer">
      Copyright &copy; 2018 by marudits
    </footer>
  </div>
</template>

<script type="text/javascript">
//library
import firebase from 'firebase';

//utils
import { getUsernameFromEmail } from './utils/helpers/stringManipulation';

export default {
  name: 'App',
  created: function(){
    if(firebase.auth().currentUser){
      this.username = getUsernameFromEmail(firebase.auth().currentUser.email)
    }
  },
  data: function(){
    return {
      username: null
    }
  },
  methods: {
    signOut(){
      firebase.auth().signOut()
        .then(() => {
          this.$router.replace('/auth');
        })
    }
  }
}
</script>

<style lang="scss" scope>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &-header {
      text-align: center;
      background-color: #1ba0e3;
      padding: 12px;
      margin-bottom: 12px;
      
      h1 {
        color: #fff;

        i {
          position: relative;
          right: 0;
          top: 0;
          font-size: 1.3em;
        }
      }

      h5 {
        margin: 0 auto;
        color: #fff;
        font-weight: 300;
        font-style: italic;
      }

      i {
        font-size: 1.5em;
        color: #fff;
        position: fixed;
        right: 5%;
        top: 3%;
        cursor: pointer;
      }
  }

  &-content {
    width: 80%;
  }

  &-footer {
    text-align: center;
    background-color: #1ba0e3;
    padding: 12px;
    margin-top: 15px;
    color: #fff;

    /*
    position: fixed;
    width: 100%;
    bottom: 0px;
    */
  }
}
</style>
