/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item=List.Item;
const Brief=Item.Brief;
class Personal extends React.Component {


  logout=()=>{
    Modal.alert('退出登录', '确定退出登录吗?', [
          { text: '取消'},
          { text: '确定', onPress: () =>{
            //清除Cookie中的userid
            Cookies.remove("userid")
            //重置redux里面的user状态
            this.props.resetUser();
          } },
        ])
  }
  render() {
    const {user}=this.props;
    return (
      <div style={{marginBottom:50, marginTop:50}}>
       <Result
       img={<img src={require(`../../assets/images/${user.header}.png`)} style={{width: 50}} alt="header"/>}
        title={user.username}
        message={user.company} //没有company就不显示
       ></Result>
       <List renderHeader={() => '相关信息'}> 
       <Item multipleLine> 
    <Brief>职位:{user.post}</Brief> 
    <Brief>简介: {user.info}</Brief> 
   {user.salary?<Brief>薪资:{user.salary}</Brief>:null}
       </Item> 
       </List> 
       <WhiteSpace/> 
       <List> <Button type='warning' onClick={this.logout}>退出登录</Button> </List>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {resetUser}
)(Personal)