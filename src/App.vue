<template>
  <div id="app" class="app">
      <header class="app-header">
        <h1>Todo App</h1>
      </header>
      <content class="app-content">
          <router-view/>
      </content>
      <footer class="app-footer"></footer>
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
      color: #fff;
      background-color: #1ba0e3;
      padding: 12px;
      margin-bottom: 12px;
      
      h1 {
        text-decoration: underline;
      }
  }

  &-content {
    width: 80%;
  }
}
</style>
