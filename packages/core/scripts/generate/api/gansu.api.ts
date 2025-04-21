export interface GansuResponseModel<T> {
  MSG: string
  RSP: T
  STATUS: string
}

export interface GansuRSP<T> {
  List: T
  RequestJnlNo: string
  _LoginType: string
  _MCHJnlNo: string
  _MCHTimestamp: string
  _MChannelId: string
  _PreCheck: string
}
