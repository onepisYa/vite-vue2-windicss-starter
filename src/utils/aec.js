import cloneDeep from 'lodash/cloneDeep'
import { ref } from 'vue'

export { cloneDeep }

/** 更好的类型检查
 * @example
  ```js
  typeCheck([]); // 'array'
  typeCheck(new Date()); // 'date'
  typeCheck(new String('onepisya')); // 'string'
  typeCheck(2) // 'number'
  typeCheck(new Boolean(true)); // 'boolean'
  typeCheck(null); // 'null'
  typeCheck({}) // 'object'
  typeCheck(undefined) // 'undefined'
  ```
 */
export function typeCheck(value) {
  const return_value = Object.prototype.toString.call(value)
  // we can also use regex to do this...
  const type = return_value.substring(
    return_value.indexOf(' ') + 1,
    return_value.indexOf(']')
  )
  return type.toLowerCase()
}

/** 简单的前后端数据适配器
 *
 *
 * @example
 * ```js
 * class SourceModel {
 * 	constructor(data) {
 * 		this.id = data.id;
 * 		this.name = data.name;
 * 	}
 * }
 *
 * class DestinationModel {
 * 	constructor(data) {
 * 		this.identifier = data.identifier;
 * 		this.fullName = data.fullName;
 * 	}
 * }
 *
 * const adapter = new DataAdapter(SourceModel, DestinationModel, {
 * 	mappings: {
 * 		id: "identifier",
 * 		name: "fullName",
 * 	},
 * 	ignoreMissingFields: true,
 * });
 *
 * const sourceData = { id: 1, name: "Alice" };
 * const destinationModel = adapter.convert(sourceData);
 * console.log(destinationModel);
 * console.log(sourceData);
 *
 * ```
 */
export class DataAdapter {
  constructor(sourceModel, destinationModel, options = {}) {
    this.sourceModel = sourceModel
    this.destinationModel = destinationModel
    this.options = options
  }

  convert(sourceData) {
    const destinationData = {}
    const { mappings = {}} = this.options

    for (const [sourceKey, destinationKey] of Object.entries(mappings)) {
      if (sourceKey in sourceData) {
        destinationData[destinationKey] = sourceData[sourceKey]
      } else if (this.options.ignoreMissingFields !== true) {
        throw new Error(`Missing field: ${sourceKey}`)
      }
    }

    return new this.destinationModel(destinationData)
  }

  reverseConvert(destinationData) {
    const sourceData = {}
    const { mappings = {}} = this.options

    for (const [sourceKey, destinationKey] of Object.entries(mappings)) {
      if (destinationKey in destinationData) {
        sourceData[sourceKey] = destinationData[destinationKey]
      } else if (this.options.ignoreMissingFields !== true) {
        throw new Error(`Missing field: ${destinationKey}`)
      }
    }

    return new this.sourceModel(sourceData)
  }
}

/** 日期格式转换器
 *
 * @param {*} _date
 *
 * @returns 如果只传一个参数，必须为原生日期对象，返回格式为； yyyy-MM-dd
 * 传两个，前面是日期字符串或时间戳，后面传 true,返回格式为 yyyy-MM-dd HH:mm:ss
 */
export const transDate = (_date, isShowTime = false) => {
  if (isShowTime) {
    _date = new Date(_date)
    console.log('_date', _date)
    const yyyy = _date.getFullYear()
    const MM = String(_date.getMonth() + 1).padStart(2, '0') // January is 0!
    const dd = String(_date.getDate()).padStart(2, '0')
    const HH = String(_date.getHours()).padStart(2, '0')
    const mm = String(_date.getMinutes()).padStart(2, '0')
    const ss = String(_date.getSeconds()).padStart(2, '0')
    const dateString = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
    console.log('dateString', dateString)
    return dateString
  } else {
    const dd = String(_date.getDate()).padStart(2, '0')
    const mm = String(_date.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = _date.getFullYear()
    const dateString = `${yyyy}-${mm}-${dd}`
    return dateString
  }
}

/** 一个简单的节流函数。
 *
 * @param {Function} cb 一个被包装的函数
 * @param {number} cooldown 技能冷却时间，期间仅仅能执行一次。
 */
export const simpleThrottle = (cb, cooldown = 10000) => {
  const ready = ref(true) // 就绪
  const wrapper = (...arg) => {
    if (ready.value === true) {
      ready.value = false // 将
      const result = cb(...arg)
      const timeoutId = setTimeout(() => {
        ready.value = true
        clearTimeout(timeoutId)
        console.log('ready')
      }, cooldown)
      return result
    } else {
      console.log('cooldown ...')
      return undefined
    }
  }
  return { wrapper, ready }
}

/**
 *
 * @param {object[]} data
 * @param {string|string[]|null} keys 这是一个需要备份的数据的字段名字，比如 name 属性，
 * 对象转换之后会有一个 originalName。
 * 如果 keys 是 null 那么则不做备份，
 * 仅仅为对象添加一个  edit 属性。 此函数可以配合 inline-edit-input 和 inline-edit-button 使用
 * @example 需要注意的是此方法是直接修改的原对象，是 inplace 的， 并不是生成一个新对象。
 * ```js
 * convertData(data, [''])
 * convertData(data)
 * ```
 */
export const convertData = (data, keys = null) => {
  const keysType = typeCheck(keys)
  data.forEach((obj) => {
    obj.edit = false
    if (keys !== null) {
      if (keysType === 'array') {
        keys.forEach((key) =>
          key.replace(/\w/, (v) => {
            const originalKey = [
              'original',
							v?.toUpperCase(),
							key.substring(1)
            ].join('')
            obj[originalKey] = obj[key]
          })
        )
      } else if (keysType === 'string') {
        const titleCaseKeys = keys.replace(/\w/, (v) => v.toUpperCase())
        const originalKey = `original${titleCaseKeys}`
        obj[originalKey] = obj[keys]
      } else {
        throw new Error(
          'keys type error, type should be string | array | null '
        )
      }
    }
    // obj.originalName = obj.name
  })
}
