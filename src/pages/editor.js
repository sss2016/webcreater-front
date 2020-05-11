import React, { Component } from 'react'
import Editor from 'for-editor'
import cookie from 'react-cookies'
import axios from 'axios';
import { Button ,Modal,Input} from 'antd';
const headers = {
  "user":cookie.load('user'),
  "userid":cookie.load('userid'),
  "username":cookie.load('username'),
}

export default class ArticlePage extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      visible:false,
      title:''
    }
  }
  showSaveLog(){
    this.setState({
      visible:true
    })
    this.props.history.push('/dashboard/articles')
  }
  handleOk(){
    this.setState({
      visible:false
    })
    const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.post('http://localhost:4000/api/savearticle',{
      content:this.state.value,
      title:this.state.title
    })
    .then(function (response) {
      console.log(response)

    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleClose(){
    this.setState({
      visible:false
    })
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  setTitle(e){
    console.log(e.target.value)
    this.setState({
      title:e.target.value
    })
  }
  render() {
    const { value ,title} = this.state
    return (
      <div>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={()=>{this.handleOk()}}
          onCancel={()=>{this.handleClose()}}
        >
          <p>请为你的文章起个名字</p>
          <p><Input value={title} onChange={this.setTitle.bind(this)} /></p>
        </Modal>
        <Editor value={value} onChange={this.handleChange.bind(this)} />
        <Button type='primary' onClick={this.showSaveLog.bind(this)} >保存</Button>
        <Button type='default' onClick={()=>{
          this.props.history.push('/dashboard/articles')
        }}>取消</Button>
      </div>
    )
  }
}
 