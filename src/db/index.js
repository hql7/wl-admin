import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage"
// import FileSync from "lowdb/adapters/FileAsync"

/**
 * auth: weilan
 * time: 2020.03.20
 * des: 本地小型数据库lowdb，可以使用lodash方法查询
 * warning: FileSync文件存储模式需要依赖一个运行node环境的文件服务
 */
class Wldb {
  /**
   * @param {*} type 存储类型 local浏览器local/file本地json文件
   * @param {*} name 数据库名
   * @param {*} options 当提供了name参数时，你能设置选项
   * @param {*} defaults 声明db数据库内默认的key
   */
  constructor(/* type = 'local', */ name = 'wldb', options = {}, defaults = {}) {
    // let adapter = type == 'local' ? new LocalStorage(name, options) : new FileSync(`${name}.json`, options);
    let adapter = new LocalStorage(name, options);
    this.db = low(adapter)
    this.db.defaults(defaults).write();
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

const wldb = new Wldb('wldb', {}, { posts: [] });
export default wldb;