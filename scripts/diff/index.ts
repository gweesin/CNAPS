import fs from 'node:fs'
import { diffJson } from 'diff'

// Read the old and new CNAPS data
const oldData = fs.existsSync('assets/cnaps.json')
  ? JSON.parse(fs.readFileSync('assets/cnaps.json', 'utf8'))
  : []

const newData = JSON.parse(fs.readFileSync('assets/cnaps.json.new', 'utf8'))

// Compare the data using diff
const differences = diffJson(oldData, newData)

// Print the differences
differences.forEach((part) => {
  if (part.added) {
    console.log('Added:', part.value)
  }
  if (part.removed) {
    console.log('Removed:', part.value)
  }
})

// Output summary
console.log('\nSummary:')
console.log('Old entries:', oldData.length)
console.log('New entries:', newData.length)
console.log('Difference:', newData.length - oldData.length)
