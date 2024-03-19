import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000
  },
})

axios.defaults.baseURL = 'https://per.gsbankchina.com'

export default axios
