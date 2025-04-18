import type { GansuDetailCnaps } from '../generate/api/cnaps'
import { diffLines } from 'diff'

export type ChangeType = 'modify' | 'add' | 'remove'
export interface Changes {
  changeType: ChangeType
  bankCode: string
  oldValue?: GansuDetailCnaps
  newValue?: GansuDetailCnaps
}

export function checkDiff(oldStr: string, newStr: string) {
  const lines = diffLines(oldStr, newStr)

  const removedMap: Map<string, GansuDetailCnaps> = new Map()
  const addedMap: Map<string, GansuDetailCnaps> = new Map()
  const diffs: Changes[] = []
  lines.forEach((change) => {
    if (!change.added && !change.removed) {
      return
    }

    const [LName, BankCode, BankName, BankId, CityCode, CityName, ProvinceName, ProvinceCode] = change.value.split(',')
    const data = {
      LName,
      BankCode,
      BankName,
      BankId,
      CityCode,
      CityName,
      ProvinceName,
      ProvinceCode,
    } as GansuDetailCnaps

    if (change.added) {
      // confirm modified data if exist in removedMap
      const removedData = removedMap.get(BankCode)
      if (removedData) {
        diffs.push({ changeType: 'modify', bankCode: BankCode, oldValue: removedData, newValue: data })
        removedMap.delete(BankCode)
        return
      }

      addedMap.set(BankCode, data)
    }
    else if (change.removed) {
      removedMap.set(BankCode, data)
    }
  })

  addedMap.forEach((data) => {
    diffs.push({ changeType: 'add', bankCode: data.BankCode, newValue: data })
  })
  removedMap.forEach((data) => {
    diffs.push({ changeType: 'remove', bankCode: data.BankCode, oldValue: data })
  })
  return diffs
}

export function checkDiffMessages(oldStr: string, newStr: string) {
  const diffs = checkDiff(oldStr, newStr)
  // eslint-disable-next-line array-callback-return
  return diffs.map((change) => {
    if (change.changeType === 'modify') {
      return `“${change.oldValue?.LName}” 更名为 “${change.newValue?.LName}”`
    }

    if (change.changeType === 'add') {
      return `新增 “${change.newValue?.LName}”`
    }

    if (change.changeType === 'remove') {
      return `移除 “${change.oldValue?.LName}”`
    }
  })
}
