/*
老板信息完善的路由容器组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "", // 头像名称
      post:"", // 职位
      info:"", // 个人或职位简介
      company:"", // 公司名称
      salary:"" // 月薪
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
        <NavBar>Boss信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem type="text" placeholder="请输入公司名称" onChange={(value)=>{this.handleChange("company",value)}}>公司名称:</InputItem>
        <InputItem type="text" placeholder="请输入招聘职位"  onChange={(value)=>{this.handleChange("post",value)}}>招聘职位:</InputItem>
        <InputItem type="text" placeholder="请输入职位薪资"  onChange={(value)=>{this.handleChange("salary",value)}}>职位薪资:</InputItem>
        <TextareaItem
          title="职位要求:"
          rows={3}
          placeholder="请输入职位要求"
          onChange={(value)=>{this.handleChange("info",value)}}
        ></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    );
  }
}

export default connect(state => ({user:state.user}), {updateUser})(BossInfo);