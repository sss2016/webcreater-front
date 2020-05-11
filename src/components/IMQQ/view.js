import React from 'react';
import { Card, Icon, Avatar,List } from 'antd';
import MessageList from './MessageList';
import FriendList from './FriendList';
import ChatWindow from './chatWindow'
const { Meta } = Card;
var SocketClient = require('socket.io-client');

  // const oldMsgData = global.MSG_CACHE
  
  // global.MSG_CACHE=[]
// const socket = require('socket.io-client')('http://localhost:3000?user=123');  
export default class IMQQ extends React.PureComponent{

    constructor(props){
        super(props)
        console.log('全局对象',global.msgcache)
        this.count = 0;
        setTimeout(this.getSocketLink.bind(this),0)

    }
    componentWillUnmount(){
      clearInterval(this.timmer)
    }
    getSocketLink(){
      var that = this;
      this.timmer=setInterval(function(){
        console.log(global.msgcache.data.length,that.count)
        if(global.msgcache.data.length>that.count){
          console.log('收到')
          let oldlen = that.count
          that.count = global.msgcache.data.length//记录上次消息长度
          let newMsgs = global.msgcache.data.slice(oldlen,that.count-oldlen)
          console.log(newMsgs)
          for(let i = 0;i <newMsgs.length;i++)
            that.onReceiveMessage(newMsgs[i])
        }
      },1000)
      // socket.on('Message'+'123456', function(msg){  ///我只关注发向我的消息，所以只监听 Message+我的id
      //     console.log('收到')
      //     // console.log(ioUserInfo);    //ioUserInfo为发送msg的用户信息    
      //     // console.log(msg)    //消息内容
      //     that.onReceiveMessage(msg);
      // })
      // this.setState({
      //   socket
      // })
    }
    state = {
        noTitleKey: 'app',
        message:"默认消息",
        userInfo:"用户1",
        
        userlist:[
          {
            title: '千手柱间',
            msglist:[{isme:false,msg:'123'},{isme:false,msg:'456'}],
            key:0
          }
        ],
        visible:false,
        currentChat:null,
        currentChatIndex:0
      };
      onSendMessage(msg){
        console.log('发送')
        global.socket.emit('sendMessage',msg)
        let arr = this.state.userlist.concat()
        arr[this.state.currentChatIndex].msglist.push(msg)
        console.log('chat',arr[this.state.currentChatIndex])
        this.setState({
          userlist:[...arr]
        })
      }
      onReceiveMessage(msg){
        this.setUserListArray(msg)
        // console.log('列表消息',msg)
        // let msgheader = {
        //   title:msg.FROM.substr(0,8),
        //   msg:msg.body.,
        // }
        // var msgobj=msgheader.concat(msg.)
        // // let newList = Object.assign({},this.state.userlist)
        // this.setState(
        //   {
        //     userlist:[...new Set(this.state.userlist.concat(user))]
        //   }
        // )
      }
      setUserListArray(userMsgobj){
        let arr = this.state.userlist.concat()
        for (var index = 0; index < arr.length; index++) {
          if(arr[index].FROM==userMsgobj.FROM){
            console.log("用户对象",userMsgobj)
            arr[index].msglist.push(userMsgobj.body)
            this.setState({
              userlist:arr
            })
          }
        }
        if(index==arr.length){
          let msgobj={
            title:userMsgobj.FROM.substr(0,8),
            msglist:[userMsgobj.body],
            TO:userMsgobj.FROM,
            FROM:userMsgobj.TO,
          }
          console.log("用户对象2",userMsgobj)

          arr.push(msgobj)
          this.setState({
            userlist:arr
          })
        }
      }
      showTheMessageList(chat,index){//获取选择的列表序号 从全局消息数组中选择应该显示的消息数组 给消息显示区
        this.setState({
          currentChat:chat,
          currentChatIndex:index
        })
      }
      onClose(){
        this.setState({
          visible:false
        })
      }
      onRemoveUser(newuserlist){
        this.setState({
          userlist:[...newuserlist]
        })
      }
    render(){
      console.log('渲染')
        return(
          <div style={{paddingRight:'2%',boxShadow:'1px 2px 3px 1px',width:'70%'}}>
                <div style={{display:'flex',flexDirection:"row"}}>
                    <MessageList 
                      onFriendSelected={(e,index)=>{this.showTheMessageList(e,index)}}
                      userlist={this.state.userlist}
                      onRemoveUser={(index)=>{
                          this.onRemoveUser(index)
                        }
                      }
                      ></MessageList>
                    <div style={{height:500}}>
                        <ChatWindow 
                        visible={this.state.visible}
                        chatting={this.state.currentChat}
                        msgList={global.msgcache.data}
                        onClose={()=>{
                          this.onClose()
                        }}
                        onSendMessage={(msg)=>{

                            this.onSendMessage(msg)
                        }}
                        > </ChatWindow>
                  </div>
              </div>

        </div>
        );
    }


}