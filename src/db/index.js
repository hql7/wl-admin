import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage"

/**
 * auth: weilan
 * time: 2020.03.20
 * 本地小型数据库lowdb，可以使用lodash方法查询
 */
class Wldb {
  /**
   * @param {*} type 存储类型 local浏览器local/file本地json文件
   * @param {*} name 数据库名
   * @param {*} options 当提供了name参数时，你能设置选项
   */
  constructor(type = 'local', name = 'wldb', options = {}) {
    if (type == 'local') {
      this.adapter = new LocalStorage(name, options)
      this.db = low(this.adapter)
    } else {
      this.db = low(`${name}.json`, options)
    }
    this.db.defaults({ posts: [], user: {} }).write();
  }

  /**
   * 将数组内添加一条数据
   * @param {*} collection 集合key
   * @param {*} val 要推入集合的value
   */
  push(collection, val) {
    this.db.get(collection).push(val).write()
  }
  /**
   * 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素
   * @param {*} collection 集合元素
   * @param {*} predicate 断言条件
   */
  find(collection, predicate) {
    return this.db.get(collection).find(predicate).value()
  }
  /**
   * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组
   * @param {*} collection 集合元素
   * @param {*} predicate 断言条件
   */
  remove(collection, predicate) {
    this.db.get(collection).remove(predicate).write()
  }
}

const wldb = new Wldb();
export default wldb;