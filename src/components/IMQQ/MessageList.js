import React from 'react';
import { List, Avatar,Icon } from 'antd';
import './index.css';
export default class MessageList extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
      userlist:props.userlist
    }
  }
  onSelected(index){
    console.log(index)
    this.props.onFriendSelected(this.props.userlist[index],index)
  }
  onRemoveUser(index){
    let newlist = this.props.userlist.concat()
    newlist.shift(index,1)//后期会换成state
    this.props.onRemoveUser(newlist)
  }
render(){
  console.log(this.props.userlist)
    return(
    
    <div style={{width: '30%'}}>
      <List
          className='userlist'
          itemLayout="horizontal"
          dataSource={this.props.userlist}//this.props.userlist
          renderItem={(item,index) => (
            <List.Item className='people' onClick={this.onSelected.bind(this,index)} tabIndex={index}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={item.title}
                description={item.msglist[0].msg}
              />
              <Icon type="close" onClick={this.onRemoveUser.bind(this,index)} />
            </List.Item>    )}
        />
    </div>
    
    )
}
    
}