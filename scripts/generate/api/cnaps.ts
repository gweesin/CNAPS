import type { AxiosResponse } from 'axios'
import type { GansuDetailCity } from './city'
import type { GansuResponseModel, GansuRSP } from './gansu.api'
import type { GansuBank } from './gansuBank'
import async from 'async'
import { MAX_CONCURRENCY } from '../constants'
import logger from '../logger'
import { getCities } from './city'
import { getBanks } from './gansuBank'
import http from './http'

export interface GansuCnaps {
  LName: string
  BankCode: string
}

export interface GansuDetailCnaps
  extends GansuCnaps,
  GansuDetailCity,
  GansuBank {
}

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
  return cnapsList.map((cnaps) => {
    return Object.assign(cnaps, { LName: cnaps.LName.replace(',', '，') }, bank, city)
  })
}

export async function getCnapsList(): Promise<GansuDetailCnaps[]> {
  const banks = await getBanks()
  const cities = await getCities(true)

  // eslint-disable-next-line ts/no-unsafe-function-type
  const promiseFnList: Array<(callback: Function) => void> = []

  const lastCity = cities[cities.length - 1]

  logger.info('start query cnaps')
  logger.info(`banks: ${banks.map(bank => bank.BankName)}`)
  logger.info(`cities: ${cities.map(city => city.CityName)}`)
  for (let idx = 0; idx < banks.length; ++idx) {
    const bank = banks[idx]
    for (const city of cities) {
      promiseFnList.push((callback) => {
        queryReallyAccBank(bank, city).then(value => callback(null, value)).catch((e) => {
          logger.error(e)
          callback(null, [])
        }).finally(() => {
          if (city === lastCity)
            logger.info(`progress: ${idx + 1}/${banks.length}, bank: ${bank.BankName} done`)
        })
      })
    }
  }

  const cnapsMatrix = await async.parallelLimit<
    GansuDetailCnaps[],
    GansuDetailCnaps[][]
  >(promiseFnList, MAX_CONCURRENCY)

  logger.info('query cnaps done')

  return cnapsMatrix
    .flatMap(cnaps => cnaps)
    .sort((a, b) => a.BankCode.localeCompare(b.BankCode))
}
