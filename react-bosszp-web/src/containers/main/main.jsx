import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import BossInfo from '../boss-info/boss-info'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import JobhunterInfo from '../jobhunter-info/jobhunter-info'
import { getRedirectTo } from '../../utils'
import { connect } from 'react-redux'
import {getUser} from '../../redux/actions'
import Boss from '../boss/boss'
import Jobhunter from '../jobhunter/jobhunter'
import Message from '../message/message'
import Personal from '../personal/personal'
import Notfound from '../../components/not-found/not-found'
import Navfooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import { NavBar } from 'antd-mobile';
class Main extends Component {
  
  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '求职者列表',
      icon: 'jobhunter',
      text: '求职者',
    },
    {
      path: '/jobhunter', // 路由路径
      component: Jobhunter,
      title: 'Boss列表',
      icon: 'boss',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  componentDidMount(){
    // 登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
    const userid=Cookies.get("userid");
    const{_id}=this.props.user;
    if(userid&&!_id){
      //发送异步请求，获取user
      this.props.getUser();
    }
  }
  render() {
    // 读取cookie中的userid
    const userid = Cookies.get('userid');
    // 如果没有, 自动重定向到登陆界面
    if (!userid) {
      return <Redirect to='/login' />
    }
    // 如果有,读取redux中的user状态
    const { user ,unReadCount} = this.props;
    if (!user._id) {
      return null
    } else {
      //如果有_id，显示对应的界面
      // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if (path === "/") {
        // 得到一个重定向的路由路径
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path} />
      }
    }

    const {navList}=this;
    const path=this.props.location.pathname;
    const currentNav=navList.find(item=>item.path===path) //得到当前的nav,可能没有
    if(currentNav){
      if(user.type==="boss"){
        navList[1].hide=true;
      }else{
        navList[0].hide=true
      }
    }
    return (
     <div>
       {currentNav?<NavBar className="sticky-header">{currentNav.title}</NavBar>:null}
       <Switch>
         {navList.map((item)=><Route path={item.path} component={item.component}></Route>)}
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path="/jobhunterinfo" component={JobhunterInfo}></Route>
        <Route path="/chat/:userid" component={Chat}></Route>
        <Route  component={Notfound}></Route>
      </Switch>
      {currentNav?<Navfooter unReadCount={unReadCount} navList={navList} ></Navfooter>:null}
     </div>
      
    );
  }
}

export default connect(state => ({ user: state.user,unReadCount:state.chat.unReadCount }),{getUser})(Main);

/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */