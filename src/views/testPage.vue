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

const searchText = ref("");
const questionList = ref([]);

async function fetchQuestionList() {
  let resp = await axios.post('http://127.0.0.1:3000/find-questions')
  searchText.value = ""
  questionList.value = resp.data
}
async function addQuestion() {
  if (!searchText.value) {
    return
  }
  let resp = await axios.post('http://127.0.0.1:3000/add', {
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
  let resp = await axios.post('http://127.0.0.1:3000/find-similar', {
    question: searchText.value
  })
  let respArr = resp.data
  questionList.value = respArr
}

fetchQuestionList()



let questionList1 = [
  '今天天气怎么样？',
  '你能告诉我现在的天气吗？',
  '外面天气如何？',
  '今天会下雨吗？',
  '外面温度多少？',
  '今晚吃什么？',
  '有没有好的晚餐建议？',
  '我今晚应该做什么吃？',
  '有什么健康的晚餐选择？',
  '你能推荐一个晚餐食谱吗？',
  '有哪些好的度假胜地？',
  '你能推荐一个旅行目的地吗？',
  '我下次度假应该去哪里？',
  '最好的旅游景点有哪些？',
  '推荐一些值得一游的地方。',
  '我怎么样才能减肥？',
  '有哪些健康的习惯？',
  '我怎么样才能保持健康？',
  '有什么好的饮食计划？',
  '你能推荐一个锻炼计划吗？',
  '我该如何修理漏水的水龙头？',
  '法国的首都是什么？',
  '怎么煮咖啡？',
  '冥想有什么好处？',
  '我该如何更换轮胎？',
  '最新的iPhone型号是什么？',
  '怎么做蛋糕？',
  '光速是多少？',
  '我该如何训练我的狗？',
  '国际象棋的规则是什么？',
  '怎么写简历？',
  '学习新语言的最佳方法是什么？',
  '怎么计算圆的面积？',
  '流感有哪些症状？',
  '怎么做自制披萨？',
  '世界上最高的山是什么？',
  '怎么照顾植物？',
  '经济学的基本原理是什么？',
  '怎么编辑视频？',
  '水的沸点是多少？',
  '怎么写商业计划？',
  '世界七大奇迹是什么？',
  '在家里怎么酿啤酒？',
  '地球和月球之间的距离是多少？',
  '怎么创建一个网站？',
  '周期表中有哪些元素？',
  '怎么弹吉他？',
  '人生的意义是什么？',
  '怎么解决魔方？',
  '热力学定律是什么？'
]

// questionList1.forEach(async item => {
//   searchText.value = item
//   await addQuestion()
// })
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
