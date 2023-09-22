<template>
  <div class="testComp">
    testComp1
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from 'vue';

  export default defineComponent({
    name: 'testComp',
    setup(props) {

      return {

      }
    },
    components: {},
    props: ['msg'],
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .testComp
    border 1px solid #00f
</style>
