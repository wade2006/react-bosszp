## 1. 项目开发准备
    1) 此项目为一个前后台分离的仿boss直聘的招聘的SPA, 包括前端应用和后端应用 
    2) 包括用户注册/登陆, 求职者/老板列表, 实时聊天等模块 
    3) 前端: 使用eact+react-router-dom+redux+react-redux+antd-mobile技术 
    4) 后端: 使用 Node + express + mongodb + socketIO 等技术 
    5) 采用模块化、组件化、工程化的模式开发

## 2. 搭建项目
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/actions/action-types

## 3. 登陆/注册界面

![QQ截图20201130110545.png](https://i.loli.net/2020/11/30/GUWwAguLnNvbaKQ.png)

​                                                                                                                             注册界面

![QQ截图20201130110559.png](https://i.loli.net/2020/11/30/ZEkKxgdYoBqTPW5.png)

​                                                                                                                                      登录界面

    1). 创建3个1级路由: main/login/register
    2). 完成登陆/注册的静态组件
        antd-mobile组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
        路由跳转: this.props.history.replace('/login')
        收集表单输入数据: state/onChange/变量属性名

## 4. 注册/登陆前台处理
    1). ajax
        ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题/配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        action-types.js
          action的type名称常量
    3). component
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
            数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)

##    5.用户信息完善界面

![QQ截图20201130111916.png](https://i.loli.net/2020/11/30/SDaJ2AviTr39RjZ.png)

​                                                                                                                         boss信息完善界面

![QQ截图20201130111643.png](https://i.loli.net/2020/11/30/UNPYsoZ6bhO2KIm.png)

​                                                                                                                                求职者信息完善界面

```
1). 用户信息完善界面路由组件: 
    组件: jobhunter-info/boss-info/header-selector
    界面: Navbar/List/Grid/InputItem/Button/TextareaItem
    收集用户输入数据: onChange监听/state 
    注册2级路由: 在main路由组件
2). 登陆/注册成功后的跳转路由计算
    定义工具函数
    计算逻辑分析
3). 后台路由处理
4). 前台接口请求函数
5). 前台redux
    action-types
    异步action/同步action
    reducer
6). 前台组件
    UI组件包装生成容器组件
    读取状态数据
    更新状态
```

## 6.搭建整体界面

```
1). 登陆状态维护
    后台将userid保存到cookie中
    前台读取cookie中的userid
    redux中管理user信息状态
    
2). 实现自动登陆
    整体逻辑分析
    ajax请求根据cookie中的userid查询获取对应的user信息
```

## 7.用户列表界面

![QQ截图20201130112905.png](https://i.loli.net/2020/11/30/rn4WAzdbDgtMZvj.png)

​                                                                                                                                求职者列表界面

![QQ截图20201130112841.png](https://i.loli.net/2020/11/30/SYDt5lJ4nsmOoe8.png)

​                                                                                                                                  boss列表界面

```
为求职者/老板列表组件抽取用户列表组件
用户是求职者的话显示boss列表，用户是boss的话显示求职者列表。
界面: antd-mobile里的Navbar/List/Card/WhiteSpace/WingBlank组件
     QueueAnim实现动画效果
异步读取指定类型用户列表数据
    后台路由
    api
    redux
    component
```

## 8.个人中心界面

![QQ截图20201130113610.png](https://i.loli.net/2020/11/30/nyBZlWPfcDEakvU.png)

​                                                                                                                                老板个人中心界面

![QQ截图20201130113554.png](https://i.loli.net/2020/11/30/hCynf6r7B3AUjXl.png)

​                                                                                                                             求职者个人中心界面

![QQ截图20201130113925.png](https://i.loli.net/2020/11/30/tbXnkQhMx9o4HZA.png)

​                                                                                                                                退出登录界面

```
1). 个人中心界面路由组件: 
    组件: personal
    界面: Navbar/Modal/Result/List/Button/Brief
    
```

## 9.聊天组件功能

![QQ截图20201130114322.png](https://i.loli.net/2020/11/30/3dE8NS4u9XmYCMs.png)

​                                                                                                                                求职者和boss聊天界面

![QQ截图20201130114737.png](https://i.loli.net/2020/11/30/fWeIp9tBzHGw3k4.png)

​                                                                                                                                   聊天表情界面

```
1). 聊天界面路由组件: 
    组件: chat
    界面: Navbar/List/InputItem/Grid
    聊天表情地址链接：https://emojipedia.org/people/
 2）.实现实时聊天的库socket.io
包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
包含2个包:
  socket.io: 用于服务器端
  socket.io-client: 用于客户端
基本思想: 远程自定义事件机制
    on(name, function(data){}): 绑定监听
    emit(name, data): 发送消息
    io: 服务器端核心的管理对象
    socket: 客户端与服务器的连接对象
    参考文档地址：
    https://socket.io/get-started/chat/ 
    http://blog.csdn.net/neuq_zxy/article/details/77531126
```

## 10.消息列表界面

![QQ截图20201130131041.png](https://i.loli.net/2020/11/30/FiT5aEpvb9VrJLS.png)

​                                                                                                                                 消息列表界面

```
1). 消息列表界面路由组件: 
    组件: message
    界面: Navbar/List/Badge
   实现：
   1.对消息进行分组保存, 且只保存每个组最后一条消息
   2.对于对象容器和数组容器的选择
   3.数组排序
```



## 