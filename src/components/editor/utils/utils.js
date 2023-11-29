/* eslint-disable no-use-before-define */
/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

function isArray(item) {
  return item && typeof item === 'object' && Array.isArray(item)
}

export const mergeArrays = (target, source) => {
  source.forEach(sourceItem => {
    if (
      !target
      || !target.find(targetItem => targetItem.name === sourceItem.name)
    ) {
      target.push(sourceItem)
    } else {
      mergeDeep(
        target.find(targetItem => targetItem.name === sourceItem.name),

        sourceItem,
      )
    }
  })

  return target
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      let newTarget

      if (isObject(source[key])) {
        newTarget = !target[key] ? { [key]: {} } : target[key]
        mergeDeep(newTarget, source[key])
      } else if (isArray(source[key])) {
        newTarget = !target[key] ? [] : target[key]
        mergeArrays(newTarget, source[key])
      } else {
        newTarget = { [key]: source[key] }
      }

      Object.assign(target, { [key]: newTarget })
    })
  }

  return target
}
