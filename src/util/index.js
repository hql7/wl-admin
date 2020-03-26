import { Message } from "element-ui";

/**
 * 防抖函数
 * @param {*} func 防抖后要执行的回调
 * @param {*} wait 等待时间
 * @param {*} immediate 
 */
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 将数组转化成树结构 array to tree
 * @param {*} array 数据源
 * @param {*} options 字段名配置项
 */

/**
 * 从坐标值拼接指定字段到祖先元素
 * @param {*} data 一维数据源
 * @param {*} coordinate 坐标值数据
 * @param {*} options 配置项
 */
function splicParentsUntil(data, coordinate, options = {
  Splic: 'Name', // 所要拼接字段
  Connector: '\\', // 连接符 
  Id: "Id", // 数据源匹配字段 
  Parents: "Parents",
  IdentityId: "IdentityId",
}) {
  let coordinate_item = data.find(i => i[options.Id] === coordinate[options.Id]);
  if (!coordinate_item) return '';
  if (!coordinate_item[options.Parents]) return coordinate_item[options.Splic];
  let _parents = coordinate_item[options.Parents]
    .substring(1, coordinate_item[options.Parents].length - 1)
    .split(",")
    .filter(i => !!i);
  let splic_parents = '';
  _parents.forEach(i => {
    let _parent = data.find(t => t[options.IdentityId] == i);
    splic_parents += `${_parent[options.Splic]}${options.Connector}`
  })
  return splic_parents + coordinate_item[options.Splic];
}

/**
 * 处理下载接口返回的文件流数据
 * @param {*} res http请求返回数据
 */
function download(res) {
  // 错误处理
  if (res.data.type == "application/json") {
    let reader = new FileReader();
    reader.readAsText(res.data, 'utf-8');
    reader.onload = function() {
      let json_data = JSON.parse(reader.result);
      Message({
        showClose: true,
        message: json_data.Message,
        type: "error"
      });
    }
    return;
  }
  // 下载处理
  let filename = "content-disposition" in res.headers ?
    decodeURIComponent(
      res.headers["content-disposition"]
      .split(";")[1]
      .split("=")[1]
      .replace(/"/g, "")
    ) :
    "下载文件";
  try {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(res.data, filename);
    } else {
      let blob = new Blob([res.data], {
        type: "application/vnd.ms-excel"
      });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url); // 释放URL 对象
      document.body.removeChild(link);
    }
  } catch (err) {
    // console.log(err)
  }
}

/**
 * 关闭其他弹出类视图函数
 * 用于切换侧滑区域内容
 * data:object 要求为该页面layout字段
 * key:string 需要打开的视图
 */
function closeOtherLayout(data = {}, key) {
  for (let item in data) {
    data[item] = false;
  }
  if (key) data[key] = true;
}

export {
  debounce, // 防抖函数
  splicParentsUntil, // 从坐标值拼接指定字段到祖先元素
  download, // download
  closeOtherLayout, // 关闭其他弹出类视图函数
}