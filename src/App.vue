<template>
  <div id="app" class="app">
      <header class="app-header">
        <router-link :to="`/`">
          <h1>Todo App</h1>
        </router-link>
      </header>
      <content class="app-content">
          <router-view/>
      </content>
      <footer class="app-footer">
        Copyright &copy; 2018 by marudits
      </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
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
