<script lang="ts" setup>
import cnaps from 'cnaps/assets/cnaps.json'
import { computed, reactive } from 'vue'
import { citiesMap, provinces } from '../public/utils.js'
import CheckRadio from './ElCheckTagGroup.vue'

const form = reactive({
  provinceCode: 'all',
  cityCode: 'all',
})

const currentCities = computed(() => citiesMap[form.provinceCode])

const currentCnaps = computed(() => {
  if (form.provinceCode === 'all') {
    return cnaps
  }

  if (form.cityCode === 'all') {
    return cnaps.filter(cnapsItem => cnapsItem.ProvinceCode === form.provinceCode)
  }

  return cnaps.filter(cnapsItem => cnapsItem.ProvinceCode === form.provinceCode && cnapsItem.CityCode === form.cityCode)
})

const columns = [
  {
    key: 'ProvinceName',
    dataKey: 'ProvinceName',
    title: '省份',
    width: 120,
  },
  {
    key: 'CityName',
    dataKey: 'CityName',
    title: '城市',
    width: 120,
  },
  {
    key: 'BankName',
    dataKey: 'BankName',
    title: '银行名称',
    width: 150,
  },
  {
    key: 'LName',
    dataKey: 'LName',
    title: '开户行',
    width: 350,
  },
  {
    key: 'BankCode',
    dataKey: 'BankCode',
    title: '大额支付号',
    width: 140,
  },
]

const currentColumns = computed(() => {
  if (form.provinceCode === 'all') {
    return columns
  }

  if (form.cityCode === 'all') {
    return columns.filter(col => !['ProvinceName'].includes(col.key))
  }

  return columns.filter(col => !['ProvinceName', 'CityName'].includes(col.key))
})
</script>

<template>
  <section class="cnaps-query">
    <el-form :model="form" label-width="auto">
      <el-form-item label="省份">
        <CheckRadio v-model="form.provinceCode" :options="provinces" />
      </el-form-item>
      <el-form-item label="城市">
        <CheckRadio v-model="form.cityCode" :options="currentCities" />
      </el-form-item>
    </el-form>
    <div class="cnaps-query__table">
      <ElAutoResizer>
        <template #default="{ height, width }">
          <ElTableV2 :columns="currentColumns" :data="currentCnaps" :width="width" :height="height" fixed />
        </template>
      </ElAutoResizer>
    </div>
  </section>
</template>

<style>
.cnaps-query {
  padding: 8px 12px;
}

.cnaps-query__table {
  overflow: auto;
  height: 700px;
  border: 1px solid var(--vp-c-divider);
  padding: 8px;
}
</style>
