/* eslint no-unused-vars : "off" */
/* eslint no-restricted-syntax : "off" */
import { permissionList } from '@/graphql/queries'
import { apolloClient } from '@/vue-apollo'
import { permissionSpliter } from './permissionSplitter'

/**
 * @async
 * @function
 * @param {{[key:string]:number[]}[]} permissionData
 * @returns {Promise<import("./definition/acTableParser").IPermissionObj>}
 */

const permissionTableGenerator = async permissionData => {
  const result = await apolloClient.query({ query: permissionList })

  /**
   * @type {{id:number,name:string}[]}
   */
  const permissions = result.data.permissionsList

  /**
   * @type {import("./definition/acTableParser").IPermissionObj}
   */
  const permissionObj = permissions.map(val => ({
    id: val.id,
    permission: val.name,
    create: false,
    read: false,
    update: false,
    del: false,
  }))
  permissionData.forEach(value => {
    for (const data in value) {
      if (!value[data].includes(0)) {
        value[data].forEach(val => {
          const objIndex = permissionObj.findIndex(obj => obj.id === val)
          permissionObj[objIndex][data] = true
        })
      }
    }
  })

  return permissionObj
}

/**
 * @async
 * @function
 * @param { import("./definition/acTableParser").IPermissionValidator } permissionData
 * @returns {Promise<import("./acTableParser").IPermissionObj>}
 */

export const permissionTableParser = async permissionData => {
  const props = ['create', 'read', 'update', 'del']
  const permission = []
  for (const data in permissionData) {
    if (props.includes(data)) permission.push({ [data]: permissionSpliter(permissionData[data]) })
  }
  const returnValue = await permissionTableGenerator(permission)

  return returnValue
}
