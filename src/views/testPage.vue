<template>
  <div class="testPage">
    <div class="page-container">
      <div class="search-section">
        <input v-model="searchText" type="text" placeholder="请输入文字内容" class="search-box" />
        <button @click="findSimilar">搜索相似</button>
        <button @click="addQuestion">添加问题</button>
        <button @click="fetchQuestionList">所有问题</button>
      </div>
      <div class="list-section">
        <ul class="text-list">
          <li v-for="(item, index) in questionList" :key="index" class="list-item">
            {{ item.question }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import apiConfig from "common/js/api_config.js"

const searchText = ref("");
const questionList = ref([]);

async function fetchQuestionList() {
  let resp = await axios.post(`${apiConfig.REQUEST_URL}/find-questions`)
  searchText.value = ""
  questionList.value = resp.data
}
async function addQuestion() {
  if (!searchText.value) {
    return
  }
  let resp = await axios.post(`${apiConfig.REQUEST_URL}/add`, {
    question: searchText.value
  })
  console.log(resp.data.message)
  searchText.value = ""
  fetchQuestionList()
}
async function findSimilar() {
  if (!searchText.value) {
    return
  }
  let resp = await axios.post(`${apiConfig.REQUEST_URL}/find-similar`, {
    question: searchText.value
  })
  let respArr = resp.data
  questionList.value = respArr
}

fetchQuestionList()

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "~common/css/config.styl"
  .page-container
    padding: 20px
    background-color: #f7f7f7
    font-family: Arial, sans-serif

    .search-section
      margin-bottom: 20px
      &>button
        padding 10px
        border 1px solid #ccc
        background #f1f1f1
        margin 0 10px
        setTransition()
        &:hover
          background-color #ccc
    .search-box
      width: 60%
      padding: 12px
      border: 1px solid #ccc
      border-radius: 4px

    .list-section
      background-color: #fff
      border-radius: 4px
      padding: 20px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

    .text-list
      list-style-type: none
      margin: 0
      padding: 0

    .list-item
      padding: 10px 0
      border-bottom: 1px solid #eee

      &:last-child
        border-bottom: none

</style>
