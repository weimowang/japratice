<template>
  <div class="container">
    <div class="flex gap-2">
      <button
        class="rounded bg-primary text-white px-4 py-2 hover:bg-black duration-300"
        @click="toTest('1')"
      >
        50音練習(隨機平假名)
      </button>
      <button
        class="rounded bg-primary text-white px-4 py-2 hover:bg-black duration-300"
        @click="toTest('2')"
      >
        50音練習(隨機片假名)
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toTest = (cate) => {
  if (cate === '1') {
    router.push(`/test/simpletest/${cate}`)
  } else if (cate === '2') {
    router.push(`/test/simpletest/${cate}`)
  }
}
</script>
