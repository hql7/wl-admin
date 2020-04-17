#!/bin/bash
function deploy() {
  echo "进入自动部署程序..."
  # 测试服务器
  test_host="root@47.98.136.80"
  # 生产服务器
  prod_host="root@47.98.136.80"
  project_path="/data/wwwroot/wlui.com.cn"

  if [ "$1" == "prod" ]; then
    target="$prod_host:$project_path"
  else
    target="$test_host:$project_path"
  fi
  echo "路径匹配完毕，正在上传..."
  rsync -azcuP ./dist/ --exclude node_modules --exclude coverage --exclude .env --exclude .nyc_output --exclude .git "$target"
  echo "部署至 $target 完成"
}

deploy $@
