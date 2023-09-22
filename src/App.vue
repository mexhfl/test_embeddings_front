<script setup lang="ts">
  import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="header">
    test_embeddings
  </div>
  <RouterView/>
</template>

<style lang="stylus" scoped>
  .header
    background-color #f1f1f1
    border-bottom 1px solid #ccc
    line-height 40px
    padding 10px
    font-weight bold
</style>
