// /* eslint-disable  */
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

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    /* eslint-disable  */
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else if (isArray(source[key])) {
        if (!target[key]) target[key] = []
        mergeArrays(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
    /* eslint-enable  */
  }

  return target
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
