import React from 'react';
import { Table, Divider, Tag,Button } from 'antd';
import cookie from 'react-cookies'
import 'whatwg-fetch'
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;

export default class Articles extends React.PureComponent{


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
    fetch('http://localhost:4000/api/getarticles', {
      method: 'get',
      headers: {
        "user":cookie.load('user'),
        "userid":cookie.load('userid'),
        "username":cookie.load('username'),
        'Content-Type': 'application/json'
      }
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
    componentWillMount(){
      this.getDesigns();
    }

    render(){
    return( 
      <div>
        <Button type='primary' ><Link to="/dashboard/editor">添加文章</Link></Button>
        <Table dataSource={this.state.data}>
        <Column title="标题" dataIndex="title" key="title" />
        <Column title="作者" dataIndex="author" key="author" />
        <Column title="创建时间" dataIndex="creat_date" key="creat_date" />
        <Column title="修改时间" dataIndex="update_date" key="update_date" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
      </div>
      )   

    }


}