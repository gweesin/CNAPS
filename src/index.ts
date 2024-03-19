import axios from 'axios'
import fse from 'fs-extra'
import axiosRetry from 'axios-retry'
import { getCnapsList } from './api/cnaps'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000
  },
})

axios.defaults.baseURL = 'https://per.gsbankchina.com';

(async function iife() {
  const cnapsList = await getCnapsList()
  await fse.writeJSON('src/assets/cnaps.json', cnapsList, { spaces: 2 })
})()
