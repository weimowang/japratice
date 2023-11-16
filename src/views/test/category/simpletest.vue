<template>
  <div class="container">
    <div class="flex flex-col mx-auto w-8/12 min-h-[90vh]">
      <span class="font-bold text-blue-800">挑戰次數 {{ totalcount }}</span>
      <span class="font-bold text-warning">錯誤次數 {{ errortotalcount }}</span>
      <div class="w-full text-left flex flex-col my-1">
        <span class="text-lg font-bold">題目:</span>
        <span class="text-[46px] text-primary text-center mb-5 font-bold">
          {{ Question[currentqindex].title }}
        </span>
      </div>
      <div
        class="grid grid-rows-2 grid-cols-2 gap-3 w-full my-5"
        v-if="Question[currentqindex].selections && Question[currentqindex].selections.length"
      >
        <div
          class="text-center cursor-pointer mx-auto flex text-lg"
          v-for="(ans, i) in Question[currentqindex].selections"
          :key="i"
        >
          <div class="bg-primary text-white p-3 w-14 h-14 rounded mx-1" @click="handleselect(ans)">
            {{ ans.val }}
          </div>
          <span
            v-if="iscorrecct"
            class="bg-gray-200 text-primary p-3 w-14 h-14 rounded mx-1 border"
          >
            {{ ans.ans }}</span
          >
        </div>
      </div>
      <div class="flex flex-col items-center font-bold">
        <div>
          <span class="">我的答案</span>
        </div>
        <div class="mt-1">
          <span class="text-2xl text-center">{{ myans }}</span>
        </div>
        <div class="mt-5">
          <sapn class="my-2 text-white bg-success py-2 px-5 rounded" v-if="iscorrecct">
            答案正確
          </sapn>
          <sapn
            class="my-2 text-danger text-sm py-2 px-5 rounded"
            v-else-if="isdoans && !iscorrecct"
          >
            答案錯誤
          </sapn>
        </div>
      </div>
      <div class="flex items-end justify-end my-5">
        <button
          v-if="!iscorrecct"
          class="border bg-primary text-white px-4 py-2 mx-2 rounded w-28"
          @click="confirm()"
        >
          送出
        </button>
        <button
          v-else
          class="border bg-white text-primary px-4 py-2 mx-2 rounded w-28"
          @click="handlenext()"
        >
          下一題
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { get50words } from '@/utils/tools.js'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log()
const words = ref([])
const Question = ref([{ title: '', ans: '', selections: [] }])
const myans = ref(null)
const isdoans = ref(false)
const currentqindex = ref(0)
const totalcount = ref(0)
const errortotalcount = ref(0)

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
function createRandonans(correctans, ansselection, key, anskey) {
  const newans = words.value[getRandomInt(50)]
  if (correctans !== newans[key] && newans[key] !== '') {
    ansselection.push({ val: newans[key], ans: newans[anskey] })
    if (ansselection.length < 3) {
      createRandonans(correctans, ansselection, key, anskey)
    }
  } else {
    createRandonans(correctans, ansselection, key, anskey)
  }
}

const createQuestion = () => {
  const Questionindex = getRandomInt(50)
  if (Question.value.length === 1) {
    if (!words.value[Questionindex].val) {
      createQuestion()
    } else {
      const qrandon = getRandomInt(2)
      if (qrandon === 1) {
        Question.value[0].title = words.value[Questionindex].en
        Question.value[0].ans = words.value[Questionindex].val
        createRandonans(words.value[Questionindex].val, Question.value[0].selections, 'val', 'en')
        Question.value[0].selections.splice(getRandomInt(3), 0, {
          val: words.value[Questionindex].val,
          ans: words.value[Questionindex].en
        })
      } else {
        Question.value[0].title = words.value[Questionindex].val
        Question.value[0].ans = words.value[Questionindex].en
        createRandonans(words.value[Questionindex].en, Question.value[0].selections, 'en', 'val')
        Question.value[0].selections.splice(getRandomInt(3), 0, {
          val: words.value[Questionindex].en,
          ans: words.value[Questionindex].val
        })
      }
    }
  }
}

const init = () => {
  const currcategory = route.params.category === '1' ? 'Hiragana' : 'Katakana'
  words.value = get50words(currcategory)
  createQuestion()
  totalcount.value += 1
}

init()

const handleselect = (ans) => {
  myans.value = ans.val
}

const iscorrecct = ref(false)
const confirm = () => {
  isdoans.value = true
  if (Question.value[currentqindex.value].ans === myans.value) {
    iscorrecct.value = true
  } else {
    errortotalcount.value += 1
    iscorrecct.value = false
  }
}
const handlenext = () => {
  Question.value = [{ title: '', ans: '', selections: [] }]
  myans.value = null
  iscorrecct.value = false
  isdoans.value = false
  totalcount.value += 1
  createQuestion()
}
</script>
