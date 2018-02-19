<template>
  <div id="app" class="app">
    <header class="ui fixed menu app-header">
      <div class="ui container">
        <router-link :to="`/`">
          <h1>
            <i class="comments icon"></i>Discussee
          </h1>
        </router-link>

        <div class="ui right floated simple dropdown item" v-if="isAuthenticated()">
          <span>
            {{ username }}
          </span>
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" href="#" v-on:click="signOut()">
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </header>
    <content class="ui main container app-content">
        <router-view/>
    </content>
    <footer class="ui footer segment app-footer">
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
      username: this.getUsername()
    }
  },
  methods: {
    getUsername(){
      return firebase.auth().currentUser ? getUsernameFromEmail(firebase.auth().currentUser.email) : ''
    },
    isAuthenticated(){
      return firebase.auth().currentUser
    },
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
      background-color: #35bdb3 !important;
      padding: 12px;
      margin-bottom: 12px;
      
      h1 {
        color: #fff;

        i {
          font-size: 1.3em;
        }
      }

      i {
        color: #fff;
        cursor: pointer;
      }

      .dropdown {
        span {
          color: #fff;
        }
      }
  }

  &-content {
    margin-top: 5em;
    margin-bottom: 5em;
  }

  &-footer {
    text-align: center;
    background-color: #35bdb3 !important;
    color: #fff;
    border-radius: 0px !important;
    position: fixed !important;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}
</style>
