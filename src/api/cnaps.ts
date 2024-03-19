import type { AxiosResponse } from 'axios'
import async from 'async'
import logger from '../logger'
import { MAX_CONCURRENCY } from '../constants'
import type { GansuDetailCity } from './city'
import { getCities } from './city'
import type { GansuRSP, GansuResponseModel } from './gansu.api'
import type { GansuBank } from './gansuBank'
import { getBanks } from './gansuBank'
import http from './http'

export interface GansuCnaps {
  LName: string
  BankCode: string
}

export interface GansuDetailCnaps
  extends GansuCnaps,
  GansuDetailCity,
  GansuBank {}

export interface QueryAccBankParam {
  bankId: string
  bankName: string
  cityCode: string
}

async function queryAccBank(params: QueryAccBankParam): Promise<GansuCnaps[]> {
  try {
    const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuCnaps[]>>>
      = await http.post(`/per/trans/queryAccBank.do?t=${Date.now()}`, {
        BankName: params.bankName,
        CityCode: params.cityCode,
        PayeeBankId: params.bankId,
      })

    return response.data.RSP?.List || []
  }
  catch (e) {
    logger.error(e)
    return []
  }
}

async function queryReallyAccBank(
  bank: GansuBank,
  city: GansuDetailCity,
): Promise<GansuDetailCnaps[]> {
  const cnapsList = await queryAccBank({
    bankId: bank.BankId,
    cityCode: city.CityCode,
    bankName: bank.BankName,
  })

  logger.debug(
    `bank: ${bank.BankName}, city: ${city.CityName}, cnaps: ${cnapsList.length}`,
  )
  // console.log(
  //   `bank: ${bank.BankName}, city: ${city.CityName}, cnaps: ${cnapsList.length}`
  // );
  return cnapsList.map(cnaps => Object.assign(cnaps, bank, city))
}

export async function getCnapsList(): Promise<GansuDetailCnaps[]> {
  const banks = await getBanks()
  const cities = await getCities(true)

  const promiseFnList: Array<(callback: Function) => void> = []

  for (const bank of banks) {
    for (const city of cities) {
      promiseFnList.push((callback) => {
        queryReallyAccBank(bank, city).then(value => callback(null, value))
      })
    }
  }

  const cnapsMatrix = await async.parallelLimit<
    GansuDetailCnaps[],
    GansuDetailCnaps[][]
  >(promiseFnList, MAX_CONCURRENCY)
  return cnapsMatrix
    .flatMap(cnaps => cnaps)
    .sort((a, b) => a.BankCode.localeCompare(b.BankCode))
}
