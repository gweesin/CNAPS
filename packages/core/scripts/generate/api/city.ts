import type { AxiosResponse } from 'axios'
import type { GansuResponseModel, GansuRSP } from './gansu.api'
import async from 'async'
import fse from 'fs-extra'
import { MAX_CONCURRENCY } from '../constants'
import http from './http'

interface GansuProvince {
  ProvinceCode: string
  ProvinceName: string
}

interface GansuCity {
  CityCode: string
  CityName: string
}

export interface GansuDetailCity extends GansuCity, GansuProvince {}

async function queryProvinces(): Promise<GansuProvince[]> {
  const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuProvince[]>>>
    = await http.post(`/per/trans/queryProvince.do?t=${Date.now()}`)

  return response.data.RSP.List
}

async function queryCity(provinceCode: string): Promise<GansuCity[]> {
  const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuCity[]>>>
    = await http.post(`/per/trans/queryCity.do?t=${Date.now()}`, {
      ProvinceCode: provinceCode,
    })

  return response.data.RSP.List
}

async function getAllCitiesByNetwork(): Promise<GansuDetailCity[]> {
  const provinces: GansuProvince[] = await queryProvinces()

  // eslint-disable-next-line ts/no-unsafe-function-type
  const promiseFnList: Array<(callback: Function) => void> = []
  for (const province of provinces) {
    promiseFnList.push(async (callback) => {
      const cities = await queryCity(province.ProvinceCode)
      callback(
        null,
        cities.map(city => Object.assign(city, province)),
      )
    })
  }

  const detailMatrix: GansuDetailCity[][] = await async.parallelLimit<
    GansuDetailCity[],
    GansuDetailCity[][]
  >(promiseFnList, MAX_CONCURRENCY)

  return detailMatrix.flatMap(detailCity => detailCity)
}

async function getAllCitiesByLocal(): Promise<GansuDetailCity[]> {
  return await fse.readJSON('assets/cities.json')
}

export async function getCities(local?: boolean): Promise<GansuDetailCity[]> {
  const cities = local
    ? await getAllCitiesByLocal()
    : await getAllCitiesByNetwork()
  return cities.sort((a, b) => {
    if (a.ProvinceCode === b.ProvinceCode)
      return a.CityCode.localeCompare(b.CityCode)

    return a.ProvinceCode.localeCompare(b.ProvinceCode)
  })
}
