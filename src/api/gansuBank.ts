import type { AxiosResponse } from 'axios'
import type { GansuRSP, GansuResponseModel } from './gansu.api'
import http from './http'

export interface GansuBank {
  BankId: string
  BankName: string
}

export async function getBanks(): Promise<GansuBank[]> {
  const response: AxiosResponse<GansuResponseModel<GansuRSP<GansuBank[]>>>
    = await http.post(`/per/trans/queryAPSBank.do?t=${Date.now()}`)
  return response.data.RSP.List.filter(bank => bank.BankName !== '检索开户行')
}
