import https from 'node:https'
import crypto from 'node:crypto'
import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000
  },
})

axios.defaults.baseURL = 'https://per.gsbankchina.com'
axios.defaults.httpsAgent = new https.Agent({
  // for self-signed you could also add
  // rejectUnauthorized: false,
  // allow legacy server
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
})

export default axios
