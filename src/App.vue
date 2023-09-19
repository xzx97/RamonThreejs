<script setup>
import Experience from "./Experience/Experience"

import { reactive, onMounted } from "vue";

const data = reactive({
  threejs3D: {}
})

onMounted(() => {
  data.threejs3D = new Experience(document.querySelector("canvas.webgl"))
})
</script>

<template>
  <!-- 创建画布，用于显示 3D 内容 -->
  <canvas class="webgl"></canvas>
</template>

<style scoped>
*
{
    margin: 0;
    padding: 0;
}

html,
body
{
    overflow: hidden;
}

.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
</style>
