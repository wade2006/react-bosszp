import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace,Button } from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    };
  }
  handleChange=(name,value)=>{
    console.log(name);
    console.log([name]);
   this.setState({
     [name]:value  // 属性名不是name, 而是name变量的值
   })
  }
  toRegister=()=>{
    this.props.history.replace("/register")
  }
  login=()=>{
    this.props.login(this.state)
  }
  render() {
    const{redirectTo,msg}=this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}></Redirect>  //如果redirectTo有值，就需要重定向到指定的路由
    }
    return (
      <div>
        <NavBar>BOSS直聘</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
          {msg?<div className="error-msg">{msg}</div>:null}
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder='请输入用户名' onChange={(value)=>{this.handleChange("username",value)}}>用户名：</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder='请输入密码' type="password" onChange={(value)=>{this.handleChange("password",value)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.login}>登录</Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toRegister}>注册账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state=>({user:state.user}),{login})(Login);