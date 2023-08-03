/**
 * @function
 * @param {string} data
 * @returns {number[]}
 */

export const permissionSpliter = data => data.split(',').map(val => +val)
