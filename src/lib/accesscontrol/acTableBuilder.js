/* eslint-disable no-unused-expressions */

/**
 * @function
 * @param {import("./definition/acTableParser").IPermissionObj} permissionData
 * @returns {import("./definition/acTableBuilder").IPermissionTableBuilder}
 */
export const permissionTableBuilder = permissionData => {
  const create = []
  const read = []
  const update = []
  const del = []
  permissionData.map(value => {
    value.create && create.push(value.id)
    value.read && read.push(value.id)
    value.update && update.push(value.id)
    value.del && del.push(value.id)

    return 0
  })

  return {
    create: create.toString(),
    read: read.toString(),
    update: update.toString(),
    del: del.toString(),
  }
}
