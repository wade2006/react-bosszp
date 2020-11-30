import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button,} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
const ListItem = List.Item;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      password2:"",
      type:"jobhunter"
    };
  }
  handleChange=(name,value)=>{
   this.setState({
     [name]:value  // 属性名不是name, 而是name变量的值
   })
  }
  toLogin=()=>{
    this.props.history.replace("/login")
  }
  register=()=>{
    this.props.register(this.state)
  }
  render() {
    const {type}=this.state;
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
            <InputItem placeholder='请输入确认密码' type="password" onChange={(value)=>{this.handleChange("password2",value)}}>确认密码：</InputItem>
            <WhiteSpace></WhiteSpace>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==="jobhunter"} onChange={()=>{this.handleChange("type","jobhunter")}}>求职者</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==="boss"} onChange={()=>{this.handleChange("type","boss")}}>BOSS</Radio>
            </ListItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state=>({user:state.user}),{register})(Register);