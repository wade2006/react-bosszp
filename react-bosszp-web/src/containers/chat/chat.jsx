/*
对话聊天的路由组件
 */
import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { readMsg,sendMsg } from "../../redux/actions"
import "./style.less"
const Item = List.Item;
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isShow:false//是否显示表情列表
    };
  }
  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();//去除字符串两边空格
    //发消息
    if (content) {
      this.props.sendMsg({ from, to, content })
    }
    //清除输入框数据
    this.setState({
      content: '',
      isShow:false

    })
  }
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }
  onkeydown=(e)=>{
    if (e.keyCode === 13) {
			this.handleSend()
		}
  }
  //监听键盘按下事件
  componentDidUpdate(){
    document.addEventListener('keydown',this.onkeydown);
    // 更新显示列表 
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidMount(){
    // 初始显示列表 
    window.scrollTo(0, document.body.scrollHeight)

  }
  componentWillUnmount () { // 在退出之前
    // 发请求更新消息的未读状态
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }


  // 在第一次render()之前回调
  componentWillMount () {
    // 初始化表情列表数据
    const emojis = ['😀', '😁', '🤣','😂', '🙂', '🙃','😉', '😊', '😇','🥰', '😍', '🤩','😘'
      ,'😘', '😚','😙', '😋', '😛','😜', '🤪', '😝','🤑', '🤗', '🤗'
      ,'🤫', '🤔','🤐', '🤨', '😐','😑', '😶', '😏','😒', '🙄', '😬'
      ,'🤥', '😌','😔', '😪', '🤤','😴', '😷', '🤒','🤢', '🤮', '🤓']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }
  render() {
    const user = this.props.user;
    const { users, chatMsgs } = this.props.chat;
    //计算当前聊天的chatId
    const meId = user._id;
    if (!users[meId]) {  //如果还没获取数据，直接不做任何显示
      return null
    }
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    //对chatMsgs进行过滤
    const msgs = chatMsgs.filter(item => item.chat_id === chatId);
    //得到目标用户的头像
    const header = users[targetId].header;
    const targetImg = require(`../../assets/images/${header}.png`)
    return (
      <div id="chat-page">
        <NavBar 
        icon={<Icon type="left" />}
        onLeftClick={() => {this.props.history.goBack()}}
        className="sticky-header">{users[targetId].username}</NavBar>
        <List style={{marginTop:50,marginBottom:50}}>
       {/* <QueueAnim type='left' > */}
         {msgs.map(item => {
            if (item.from === targetId) {
              return (<Item
                key={item._id}
                thumb={targetImg}
              >
                {item.content}
              </Item>)
            } else {
              return (<Item
                key={item._id}
                className="chat-me"
                extra="我"
              >
                {item.content}
              </Item>)
            }
          })

          }
          {/* </QueueAnim>  */}
        </List>
        <div className="am-tab-bar">
          <InputItem
           style={{maxHeight:24}}
           className="input_class"
            placeholder="请输入消息"
            value={this.state.content}
            onChange={(value) => { this.setState({ content: value }) }}
            onFocus={()=>{this.setState({isShow:false})}}
            extra={<span
            >
              <span style={{marginRight:5,lineHeight:2}} onClick={this.toggleShow}>🤒</span><span onClick={this.handleSend} onKeyDown={(e)=>this.onkeydown(e)}>发送</span>
            </span>}
          >
          </InputItem>
          { this.state.isShow? 
        (<Grid data={this.emojis} 
        columnNum={8} 
        carouselMaxRow={4} 
        isCarousel={true} 
        onClick={(item) => { this.setState({content: this.state.content + item.text}) }} />) 
        : null }
        </div>
      </div>

    );
  }
}

export default connect(state => ({ user: state.user, chat: state.chat }), {sendMsg,readMsg})(Chat);