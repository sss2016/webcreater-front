import React from 'react';
import { Table, Divider, Tag,Button } from 'antd';
import 'whatwg-fetch'
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;

export default class Forms extends React.PureComponent{


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
    fetch('http://localhost:4000/api/getForms?author='+'root', {
      method: 'get',
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
        <Table dataSource={this.state.data}>
        <Column title="标题" dataIndex="form_title" key="form_title" />
        <Column title="字段" dataIndex="filed_set" key="filed_set" />
        <Column title="创建人" dataIndex="author_name" key="author_name" />
        <Column title="创建时间" dataIndex="creat_date" key="creat_date" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
                <Link to={"/dashboard/formsubmits/"+record._id}>查看提交详情</Link>
            </span>
          )}
        />
      </Table>
      </div>
      )   

    }


}