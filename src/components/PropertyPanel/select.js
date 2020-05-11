import React, { Component } from 'react';
import { List, Typography,Icon,Button,Modal,Input} from 'antd';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
const data = [
  'Racing car .',
  'Japanese',
  'Australian.',
  'Man charged.',
  'Los Angeles.',
  'Los Angeles.',
];

class SelectPanel extends Component {
    state = { visible: false };
    data=[]
    constructor(props){
      super(props)
      this.data=props.setting.configs.data
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    updateState(){
      this.props.setting.configs.data = this.data
      this.props.onSetProperty( this.props.setting.configs)
    }
    handleOk = e => {
      console.log(this.refs.addtitle.state.value);
      this.data.push(this.refs.addtitle.state.value)

      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    onRemove(index){
      console.log('删除',index)
      this.data.splice(index,1)
      console.log('删除',this.data)
      this.updateState()
    }
    onAdd(index){

        this.setState({
            visible:true
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>请输入选项标题</p>
                    <p><Input ref='addtitle'></Input></p>
                    </Modal>
                    <List
                        style={{height:'200px',overflow:'auto'}}
                        size="small"
                        bordered
                        dataSource={this.data}
                        renderItem={(item,index) => <List.Item><span>{item}</span><Icon type="close" onClick={this.onRemove.bind(this,index)}/></List.Item>}
                        />
                    <Button type='primary' size='small' onClick={this.onAdd.bind(this)}>添加选项</Button>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectPanel);
