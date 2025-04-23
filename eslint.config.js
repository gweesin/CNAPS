// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    ignores: [
      // eslint ignore globs here
      '**/assets/**',
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
