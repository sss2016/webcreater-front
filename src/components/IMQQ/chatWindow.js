import React from 'react';
import { Input,Button,Avatar,Icon  } from 'antd';
import Facepanel from './facepanel'
import _ from "lodash";
import './index.css';
const { TextArea } = Input;
export default class ChatWindow extends React.PureComponent{
sendMessage(){
    this.setState({
        message:''
    })
    this.onSend(this.state.message)
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
        msgList:props.msgList||[],
        socket:props.socket,
        faceshow:false
    }

    // console.log('已监听'+'Message'+props.from_user)
    // socket.on('Message'+props.from_user, function(msg){
    //     console.log('收到')
    //     // console.log(ioUserInfo);    //ioUserInfo为发送msg的用户信息    
    //     // console.log(msg)    //消息内容
    // that.onReceiveMessage(msg);
    // (!that.props.msgList||!(that.state.msgList.length==that.props.msgList.length))&&that.addToMsgList(msg)
    // })
}
addToMsgList(msgobj){
    // var tmparr = this.state.msgList
    // tmparr.push(
    //   msgobj
    // )
    // console.log('链接之前',this.state.msgList)
    this.setState(
    {
        msgList:[this.state.msgList.concat(msgobj)]
    }
    )
}
onSend(mesg){
    // const { message } = this.state; //获取input输入的内容
    // const { userInfo } = this.state;
    // console.log('发送' + this.state.message)
    //触发发送内容的函数
    
    let msgobj = {
      isme:true,
      msg:mesg,
      time:this.getTime(),
      FROM:this.props.chatting.FROM,
      TO:this.props.chatting.TO
    }
    // console.log('已发送'+this.props.to_user)
    this.addToMsgList(msgobj)
    this.props.onSendMessage(msgobj)
    // this.state.socket.emit('sendMessage',msgobj)
    
    
    // this.sendMessage(userInfo,mesg);
  }
onReceiveMessage(msg){
    this.props.onReceiveMessage&&this.props.onReceiveMessage(msg);

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
    const visible = this.props.visible||true;
    const faceshow = this.state.faceshow;
    return(
        this.props.chatting?<div className='chatwin' onClick={this.cancelFacePanel.bind(this)}>
            
            <div className='chat-title'>
                {this.props.chatting.title}
            </div>
            <div className='msglist'>
                {this.generatorMsgList(this.props.chatting.msglist)}
            </div>
            <div className='tools'>
            <Icon type="smile" className='icon' onClick={this.onShowFace.bind(this)} />{faceshow&&<Facepanel onSelectFace={(e)=>{this.onSelectFace(e)}}></Facepanel>}
            <Icon type="picture" className='icon' />
            </div>
            <div className='msginput'>
                <TextArea ref='input' rows={3} onChange={this.dataChange.bind(this)}  
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