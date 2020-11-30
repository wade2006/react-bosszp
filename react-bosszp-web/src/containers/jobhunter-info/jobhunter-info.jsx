/*
大神信息完善的路由容器组件
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class JobhunterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "", // 头像名称
      post:"", // 职位
      info:"", // 个人或职位简介
    };
  }
  handleChange=(name,value)=>{
    this.setState({
    [name]:value
    })
  }
  setHeader=(header)=>{
     this.setState({header})
  }
  save=()=>{
    this.props.updateUser(this.state)
  }
  render() {
    const {type,header}=this.props.user;
    if(header){ //说明信息已经完善
      const path=type==="boss"?"boss":"jobhunter"
      return <Redirect to={path}></Redirect>
    }
    return (
      <div> 
        <NavBar>求职者信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem type="text" placeholder="请输入求职岗位" onChange={(value)=>{this.handleChange("post",value)}}>求职岗位:</InputItem>
        <TextareaItem
          title="个人介绍:"
          rows={3}
          placeholder="请输入个人介绍"
          onChange={(value)=>{this.handleChange("info",value)}}
        ></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button></div>
    );
  }
}

export default connect(state => ({user:state.user}), {updateUser})(JobhunterInfo);