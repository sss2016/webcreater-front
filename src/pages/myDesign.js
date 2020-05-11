import React from 'react';
import { Table, Divider, Tag,Button,tags } from 'antd';
import cookie from 'react-cookies'
import {  message } from 'antd';
import axios from "axios"
import 'whatwg-fetch'
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;
var Config = require('Config')

export default class DesignMan extends React.PureComponent{


    data = [
        {
          key: '1',
          firstName: 'John',
          lastName: 'Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          firstName: 'Jim',
          lastName: 'Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          firstName: 'Joe',
          lastName: 'Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
    state={
      data:[]
    }
    getDesigns(){
      let self = this
    fetch(Config.serverUrl+'/api/getDesigns', {
      method: 'get',
      headers: {
        "user":cookie.load('user'),
        "userid":cookie.load('userid'),
        "username":cookie.load('username'),
        'Content-Type': 'application/json'
      },
    }).then((response)=>
        response.json()
    ).then(function(res){
      console.log(res)
        self.setState({
          data:res.data.list
        })
    }).catch((err)=>{
      console.log(err)
    })
    }
    copyUrl2(Url2)
    {
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display='none';
        message.success("已将内容复制到剪切板")
    }
    deleteDesign(id){
      var self = this
      axios.get(Config.serverUrl+'/api/deleteDesign',{params:{id:id}})
      .then(function(resp){
        console.log(resp)
        self.getDesigns()
  
      })
    }
    componentWillMount(){
      this.getDesigns();
    }

    render(){
    return( 
      <div>
        <Button type='primary' ><Link to="/dashboard/a">添加设计</Link></Button>
        <Table dataSource={this.state.data}>
        <Column title="标题" dataIndex="d_name" key="d_name" />
        <Column title="作者" dataIndex="author_name" key="author_name" />
        <Column title="创建时间" dataIndex="creat_date" key="creat_date" />
        <Column title="修改时间" dataIndex="update_date" key="update_date" />
        <Column title="状态" dataIndex="state" key="state" 
					render={tags => (
						<span>
						{tags==0&&<Tag color="red" key={tags}>拒绝</Tag>}
						{tags==1&&<Tag color="green" key={tags}>通过</Tag>}
						{tags==-1&&<Tag color="blue" key={tags}>待审核</Tag>}
						</span>
					)} />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a onClick={this.copyUrl2.bind(this,"http://localhost:4000/show/"+record.author+"/"+record.timestamp)}>复制链接</a>
              <Divider type="vertical" />
              <a onClick={this.deleteDesign.bind(this,record._id)}>删除</a>
            </span>
          )}
        />
      </Table>
      </div>
      )   

    }


}