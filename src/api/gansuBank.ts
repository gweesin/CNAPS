import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { GansuRSP, GansuResponseModel } from './gansu.api'

export interface GansuBank {
  BankId: string
  BankName: string
}

export async function getBanks(): Promise<GansuBank[]> {
  const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuBank[]>>>
    = await axios.post(`/per/trans/queryAPSBank.do?t=${Date.now()}`)
  return response.data.RSP.List
}
