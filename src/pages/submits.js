import React from 'react';
import { Table, Divider, Tag,Button } from 'antd';
import 'whatwg-fetch'
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;
//暂时不写，本页会根据路由来判断怎样显示表格
export default class Submits extends React.PureComponent{


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
      data:[],
      fieldset:[]
    }
    getDesigns(){
      let self = this
    fetch('http://localhost:4000/api/getSubmits?form_id='+self.props.match.params.f_id, {
      method: 'get',
    }).then((response)=>
        response.json()
    ).then(function(res){
        self.setState({
            fieldset:res.data.predata.filed_set,
            data:res.data.list
        })
    }).catch((err)=>{
      console.log(err)
    })
    }
    componentWillMount(){
      this.getDesigns();
    }
    createTableHeader(){
     return  this.state.fieldset.map((item,index)=>{
            console.log("formEl"+index)
            return(
                <Column title={item} dataIndex={"formEl"+index} key={index} />
            )
        })
    }
    objectSmooth(data){
      for(let i = 0;i<data.length;i++){
        Object.assign(data[i],data[i].form_data)
      }
      return data;
    }
    render(){
      const data = this.objectSmooth(this.state.data)
    return( 
      <div>
        <Table dataSource={data}>
 
        {this.createTableHeader()}
        <Column title="创建时间" dataIndex="creat_date" key="creat_date" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a>Delete</a>
              <a>prview</a>
            </span>
          )}
        />
      </Table>
      </div>
      )   

    }


}