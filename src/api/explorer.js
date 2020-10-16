import http from "./__http__";

// 1获取文件夹列表
const getFileListApi = data =>
  http.post({
    url: "/explorer/fileList",
    data
  });

// 2新增文件夹
const addFolderApi = data =>
  http.post({
    url: "/explorer/addFile",
    data
  });

// 4获取全部文件夹
const getAllFoldersApi = data =>
  http.post({
    url: "/explorer/pathList",
    data
  });

// 6删除文件|文件夹
const delFileApi = data =>
  http.post({
    url: "/explorer/delFile",
    data
  });

// 8下载数据
const downloadDataApi = data =>
  http.post({
    url: "/explorer/download",
    expand: { responseType: "blob" },
    data
  });

// 9文件夹移动
const fileMoveApi = data =>
  http.post({
    url: "/data/moveFile",
    data
  });

export {
  getFileListApi, // 1获取文件夹列表
  addFolderApi, // 2新增文件夹
  getAllFoldersApi, // 4获取全部文件夹
  delFileApi, // 6删除文件|文件夹
  downloadDataApi, // 8下载数据
  fileMoveApi // 9文件夹移动
};
