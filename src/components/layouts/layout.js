import React from 'react';
import '../../App.css';
import { Layout,Icon,Avatar,Menu,Dropdown,Badge } from 'antd';
import DashRoute from '../../route/dashboard';
import SideMenu from './sideMenu'
import axios from "axios"
import cookie from 'react-cookies'
const { Header, Sider, Content } = Layout;
// const socket = require('socket.io-client')('http://localhost:3000');  
// socket.on('Messageadminuser111',function(msg){
//   global.msgcache.data.push(msg)
//   // console.log(global.MSG_CACHE)
// })
var SocketClient = require('socket.io-client');

global.msgcache={
    data:[],
    userid:cookie.load('username')
}
let socket = new SocketClient('http://localhost:4000')
global.socket = socket
console.log('global.msgcache.userid',global.msgcache.userid)
socket.on('Message'+global.msgcache.userid||'root', function(msg){  ///我只关注发向我的消息，所以只监听 Message+我的id
    global.msgcache.data.push(msg)
})
class Mylayout extends React.Component {
  state = {
    collapsed: false,
    c_link:'/',
    msgcount:0
  };
  constructor(props){
    super(props);
    if(localStorage.getItem('isLogin')!=='1'){
      this.props.history.push("/")
    }
    this.getNotice();
  }
  getNotice(){
    axios.get('http://localhost:4000/api/getAllNotice').then(firstdata=>{
        let allNotice = firstdata.data.data.list
         axios.get('http://localhost:4000/api/getreadNotice').then(data=>{
           let haveread = data.data.data.list
          this.setState({
            msgcount:allNotice.length-haveread.length
          })
        });
    });
}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toNews(){
    this.props.history.push("/dashboard/bellcenter") 
  }
  onGetPath(key){
    this.props.history.push(key) 
  }
  logout(){
    localStorage.setItem('isLogin', null);
    this.props.history.push('/') 
  }
  render(){
    console.log(this.props)
    let createHashHistory =require("history").createHashHistory
    const hashHistory = new createHashHistory();
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer"  onClick={this.logout.bind(this)}>
            注销登录
          </a>
        </Menu.Item>
      </Menu>
    );
  return (
    <Layout id="components-layout-demo-custom-trigger">
        <SideMenu onGetPath={this.onGetPath.bind(this)} history={hashHistory}>

        </SideMenu>
        <Layout>
           <Header style={{ background: '#fff', padding: 0 ,display:'flex',justifyContent:"flex-end"}}>
             <div style={{display:"flex",alignItems:"center",marginRight:"30px"}}>
               <Badge count={this.state.msgcount}>
								<Icon style={{ fontSize: '21px', cursor: 'pointer' }} type="bell" onClick={this.toNews.bind(this)} />
							</Badge>
              </div>
              <div style={{display:"flex",alignItems:"center",marginRight:50}}>
              
                <Avatar icon="user"  />
                <Dropdown overlay={menu} style={{margin:"0 10"}}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}> {global.msgcache.userid}<Icon type="down" />
                </a>
                </Dropdown>
              </div>

          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 600,
            }}
          >

            <DashRoute history={hashHistory}></DashRoute>
          </Content>
        </Layout>
      </Layout>
  );
}
}
export default Mylayout;