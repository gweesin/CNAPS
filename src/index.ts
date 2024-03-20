import fse from 'fs-extra'
import type { GansuDetailCnaps } from './api/cnaps';

(async function iife() {
  const old = await fse.readFile('assets/old.txt', 'utf-8')
  let innerList: any[] = old.split('\r\n').map((line) => {
    const [cnaps, bankCode, areaCode, openAccBankName] = line.split('\t')
    return {
      cnaps,
      bankCode,
      areaCode,
      openAccBankName,
    }
  })
  const map = innerList.reduce((obj, item) => {
    // @ts-expect-error @eslint-ignore
    obj[item.cnaps] = item
    return obj
  }, {})

  const unExistList: any[] = []
  let outerList = (await fse.readJSON(
    'assets/cnaps.json',
  )) as GansuDetailCnaps[]

  const bankMap = (await fse.readJSON('assets/bankMap.json')).reduce(
    (map: object, item: any) => {
      return Object.assign(map, { [item.outerBankCode]: item.innerBankCode })
    },
    {},
  ) as Record<string, string>

  outerList = outerList
    .filter(cnaps => !/[A-Za-z]/.test(cnaps.BankName))
    .map((cnaps) => {
      cnaps.BankId = bankMap[cnaps.BankId]
      return cnaps
    })

  const conflictList: GansuDetailCnaps[] = []
  outerList.forEach((item) => {
    // @ts-expect-error @eslint-ignore
    const originalItem = map[item.BankCode]
    if (originalItem) {
      // @ts-expect-error @eslint-ignore
      delete map[item.BankCode]
      if (originalItem.areaCode !== item.CityCode)
        conflictList.push(originalItem)
    }
    else {
      unExistList.push({
        cnaps: item.BankCode,
        bankCode: item.BankId,
        areaCode: item.CityCode,
        openAccBankName: item.LName,
      })
    }
  })

  innerList.push(...unExistList)
  await fse.writeJSON('assets/conflict.json', unExistList, { spaces: 2 })
  innerList = innerList.sort((a, b) => {
    if (a.bankCode === b.bankCode) {
      if (a.areaCode === b.areaCode)
        return a.cnaps.localeCompare(b.cnaps)

      return a.areaCode.localeCompare(b.areaCode)
    }

    return a.bankCode?.localeCompare(b.bankCode)
  })

  await fse.writeFile(
    'assets/merge.csv',
    innerList.reduce((tot, item) => {
      return (
        `${tot
        }${item.cnaps}\t${item.bankCode}\t${item.areaCode}\t${item.openAccBankName}\n`
      )
    }, ''),
  )
})()
