import pino from 'pino'

let lastTimestamp = Date.now()

export default pino({
  formatters: {
    bindings() {
      return {}
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  mixin() {
    const nowTimestamp = Date.now()
    const diffTimestamp = nowTimestamp - lastTimestamp
    lastTimestamp = nowTimestamp

    return {
      // convert diff timestamp to seconds
      diffSeconds: `${diffTimestamp / 1000}s`,
    }
  },
})
