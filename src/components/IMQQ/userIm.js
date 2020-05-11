import React from 'react';
import { Input,Button,Avatar,Icon  } from 'antd';
import Facepanel from './facepanel'
import cookie from 'react-cookies'
import _ from "lodash";
const { TextArea } = Input;
var SocketClient = require('socket.io-client');
var socket=new SocketClient('http://localhost:4000')
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  function getUID() {
    let uu_id;
    if (global.localStorage) {
      uu_id=global.localStorage.getItem("uu_id")
      if(!uu_id){
        uu_id=guid();
        global.localStorage.setItem('uu_id',uu_id)
      }
    }else{
      uu_id=guid();
    }
    return uu_id;
  }
var uid=getUID()
export default class Chatforuser extends React.PureComponent{
sendMessage(){
    let msgobj = {
        isme:true,
        msg:this.state.message,
        time:this.getTime(),
        TO:this.props.to_user,
        FROM:uid
      }
      this.addToMsgList(msgobj)
      this.toSend(msgobj)
}
getTime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year+'年'+month+'月'+day+'日 '+hour+':'+minute;
}

constructor(props){

   super(props);
//    let socket=new SocketClient('http://localhost:4000')
//    console.log('成功')
//    console.log(props.msgList);
     
   this.state={
        message:'',
        msgList:[],
        faceshow:false
    }
    var that = this;
    // console.log('已监听'+'Message'+props.from_user)
    socket.on('Message'+uid, function(msg){
        that.onReceiveMessage(msg);
    })
}
addToMsgList(msgobj){
    this.setState(
        {
            msgList:this.state.msgList.concat(msgobj)
        }
    )
}
toSend(msgobj){
    socket.emit('sendMessage',msgobj)
}
onReceiveMessage(msg){
    let newobj = {
        isme:msg.msg.isme,
        msg:msg.msg.msg
    }
    this.addToMsgList(newobj)

}
dataChange(e){
    // console.log(e)
    this.setState({
        message:e.target.value
    })
}
generatorMsgList(msglist){
    // var data =this.state.msgList;
    // console.log(data)
    return _.map(msglist,(item,key)=>{
        console.log('将打印',item)
        var  component =''

        if(!item.isme){
         component=(
            <div className='msgline' key={key}>
                <div style={{float:'left',width:'200px'}}>
                    <div className='user-head notme' >

                    </div>
                    <div className='buble' style={{float:'right'}}>
                            {item.msg}
                    </div>
                </div>
            </div>)
        }else{
            component=(
            <div className='msgline' key={key}>
                <div style={{width:'200px',float:"right"}}>
                     <div className='buble' style={{float:'left'}}>
                            {item.msg}
                    </div>
                    <div className='user-head isme'>

                    </div>
                </div>
            </div>)
    

        }
        console.log('打印完毕')
        return component
    })
}
onSelectFace(face){
    if(face.nodeType==3){
        this.setState({
            message:this.state.message+face.nodeValue
        })
    }
}
onClose(){

    this.props.onClose();
}
onShowFace(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
        faceshow:true
    })
}
cancelFacePanel(){
    this.setState({
        faceshow:false
    })

}
render(){
    const faceshow = this.state.faceshow;
    return(
        this.props.chatting?<div className='chatwin position' onClick={this.cancelFacePanel.bind(this)}>
            
            <div className='chat-title'>
                {cookie.load('author_name')}
            </div>
            <div className='msglist'>
                {this.generatorMsgList(this.state.msgList)}
            </div>
            <div className='tools'>
            <Icon type="smile" className='icon' onClick={this.onShowFace.bind(this)} />{faceshow&&<Facepanel onSelectFace={(e)=>{this.onSelectFace(e)}}></Facepanel>}
            <Icon type="picture" className='icon' />
            </div>
            <div className='msginput'>
                <TextArea  rows={3} onChange={this.dataChange.bind(this)}  
                value={this.state.message}
                style={{border: "none",outline: 'none',resize:'none',boxShadow:"none",background:'none',overflowY:'auto'}}/>
               
            </div>
            <div className='btns'>
                <Button onClick={this.onClose.bind(this)} className='btn'>close</Button>
                <Button type='primary' onClick={this.sendMessage.bind(this)} className='btn'>send</Button>
            </div>

        </div>:null
    )
}
    
}