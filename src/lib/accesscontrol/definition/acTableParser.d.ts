export type IPermissionValidator = {
  corp: {
    id: number
    name: string
  },
  role: {
    id: number
    name: string
  },
  create: string
  read: string
  update: string
  delete: string
}
export type IPermissionObj = {
  id: number
  permission: string
  create: boolean
  read:boolean
  update:boolean
  del:boolean
}[]