/*
显示指定用户列表的UI组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const { userList } = this.props
    return (
      <WingBlank size="lg" style={{marginTop:50,marginBottom:50}}>
        <QueueAnim type="scale" >{
          userList.map((item,index) => {
            return <div key={item._id}>
              <WhiteSpace size="lg" />
              <Card  onClick={()=>{this.props.history.push(`/chat/${item._id}`)}}>
                <Header
                  thumb={require(`../../assets/images/${item.header}.png`)}
                  extra={<span>{item.username}</span>}
                />
                <Body>
          <div>职位：{item.post}</div>
          {item.company?<div>公司:{item.company}</div>:null}
          {item.salary?<div>月薪:{item.salary}</div>:null}
          <div>描述:{item.info}</div>
                </Body>
              </Card>
            </div>
          })
        }</QueueAnim>
        
      </WingBlank>
    )
  }
}

export default withRouter(UserList)