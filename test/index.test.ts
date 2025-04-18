import { describe, expect, it } from 'vitest'
import { checkDiff } from '../src/diff'

const header = `LName,BankCode,BankName,BankId,CityCode,CityName,ProvinceName,ProvinceCode`
const lineOne = `中国工商银行股份有限公司杭州钱塘支行,102331005059,中国工商银行,102100099996,3310,杭州市,浙江省,33`
const lineTwo = `中国工商银行股份有限公司北京金台路支行,102100002020,中国工商银行,102100099996,1000,北京市,北京市,11`
const lineOneAfter = `中国工商银行杭州经济技术开发区支行,102331005059,中国工商银行,102100099996,3310,杭州市,浙江省,33`

function mergeCsv(...lines: string[]) {
  return [header, ...lines].join('\n')
}

describe('checkDiff', () => {
  it('modify', async () => {
    const result = checkDiff(mergeCsv(lineOne), mergeCsv(lineOneAfter))
    await expect(result).toMatchFileSnapshot('__snapshots__/modify.diff')
  })

  it('add', async () => {
    const result = checkDiff(mergeCsv(), mergeCsv(lineOne))
    await expect(result).toMatchFileSnapshot('__snapshots__/add.diff')
  })

  it('delete', async () => {
    const result = checkDiff(mergeCsv(lineOne), mergeCsv())
    await expect(result).toMatchFileSnapshot('__snapshots__/delete.diff')
  })

  it('hydrate', async () => {
    const result = checkDiff(mergeCsv(lineOne), mergeCsv(lineOneAfter, lineTwo))
    await expect(result).toMatchFileSnapshot('__snapshots__/hydrate.diff')
  })
})
