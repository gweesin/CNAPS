<script lang="ts" setup>
import { watchEffect } from 'vue'

const props = defineProps<{
  options: Array<{ value: any, label: string }>
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue'])

function handleCheck(value: any) {
  emit('update:modelValue', value)
}

watchEffect(() => {
  if (props.options?.every(option => option.value !== props.modelValue)) {
    emit('update:modelValue', props.options[0].value)
  }
})
</script>

<template>
  <div class="el-check-tag-group">
    <el-check-tag
      v-for="option in options"
      :key="option.value"
      plain
      :checked="modelValue === option.value"
      @change="(value) => value && handleCheck(option.value)"
    >
      {{ option.label }}
    </el-check-tag>
  </div>
</template>

<style>
.el-check-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.el-check-tag {
  margin: 0 !important;
}
</style>
