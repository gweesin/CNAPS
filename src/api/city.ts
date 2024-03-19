import type { AxiosResponse } from 'axios'
import axios from 'axios'
import fse from 'fs-extra'
import type { GansuRSP, GansuResponseModel } from './gansu.api'

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
    = await axios.post(`/per/trans/queryProvince.do?t=${Date.now()}`)

  return response.data.RSP.List
}

async function queryCity(provinceCode: string): Promise<GansuCity[]> {
  const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuCity[]>>>
    = await axios.post(`/per/trans/queryCity.do?t=${Date.now()}`, {
      ProvinceCode: provinceCode,
    })

  return response.data.RSP.List
}

async function getAllCitiesByNetwork(): Promise<GansuDetailCity[]> {
  const provinces: GansuProvince[] = await queryProvinces()

  const detailCities: GansuDetailCity[] = []

  for (const province of provinces) {
    const cities = await queryCity(province.ProvinceCode)
    detailCities.push(...cities.map(city => Object.assign(city, province)))
  }

  return detailCities
}

async function getAllCitiesByLocal(): Promise<GansuDetailCity[]> {
  return await fse.readJSON('assets/cities.json')
}

export async function getCities(local?: boolean): Promise<GansuDetailCity[]> {
  return local ? getAllCitiesByLocal() : getAllCitiesByNetwork()
}
