/*
包含n个工具函数的模块
 */
/*
用户主界面路由
  boss: /boss
  jobhunter: /jobhunter
用户信息完善界面路由
  boss: /bossinfo
  jobhunter: /jobhunter
判断是否已经完善信息? user.header是否有值
判断用户类型: user.type
 */
/*
返回对应的路由路径
 */
export function getRedirectTo(type, header) {
  let path;
  if(type==="boss"){
    path="/boss"
  }else{
    path="/jobhunter"
  }
  if(!header){  //没有头像的话需要跳转到完善信息界面
   path+="info"
  }
  return path
}