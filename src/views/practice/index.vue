<template>
  <div class="container">
    <div class="mb-4 px-5">
      <button
        class="border px-4 py-1 mx-2 rounded w-28"
        :class="{
          'bg-primary': currentcate === 'Hiragana',
          'text-white': currentcate === 'Hiragana',
          'bg-white': currentcate !== 'Hiragana',
          'text-primary': currentcate !== 'Hiragana'
        }"
        @click="handlechangecate('Hiragana')"
      >
        平假名
      </button>
      <button
        class="border px-4 py-1 mx-2 rounded w-28"
        :class="{
          'bg-primary': currentcate === 'Katakana',
          'text-white': currentcate === 'Katakana',
          'bg-white': currentcate !== 'Katakana',
          'text-primary': currentcate !== 'Katakana'
        }"
        @click="handlechangecate('Katakana')"
      >
        片假名
      </button>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="(word, index) in words"
        :key="index"
        class="rounded text-center flex items-center justify-center hover:shadow-lg cursor-pointer"
      >
        <span
          class="bg-primary font-bold text-white w-10 h-10 mx-1 rounded flex items-center justify-center"
        >
          {{ word.val }}</span
        >
        <span
          class="bg-gray-200 font-bold text-primary w-10 h-10 mx-1 rounded flex items-center justify-center"
        >
          {{ word.en }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { get50words } from '@/utils/tools.js'
const words = ref([])
const currentcate = ref('Hiragana')
words.value = get50words(currentcate.value)
const handlechangecate = (cate) => {
  currentcate.value = cate
  words.value = get50words(cate)
}
</script>
