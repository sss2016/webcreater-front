import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import { Radio,Input  } from 'antd';
class ButtonPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          buttonName:'default',
          buttonStyle:0

        }
    }
    handleChange(prop,e){
      this.setState({
        [prop] : e.target.value,
        }
      ) 
    }
    getMyData(){

      return {
        'buttonName':this.state.buttonName,
        'buttonStyle':this.state.buttonStyle
      }
    }
  render() {
    return (
        <div>
            <p>按钮名称</p>
            <p>
            <Input placeholder="请输入按钮名称" defaultValue='default' onBlur={this.handleChange.bind(this,'buttonName')}  />
            </p>
            <p>按钮风格</p>
            <div style={{marginBottom:10}} >
                <Radio.Group onChange={this.handleChange.bind(this,'buttonStyle')}>
                <Radio value={1}>primary</Radio>
                <Radio value={2}>default</Radio>
                <Radio value={3}>dashed</Radio>
                <Radio value={4}>Danger</Radio>
                <Radio value={5}>Link</Radio>
                </Radio.Group>
            </div>
            <p>左边距</p>
            <p>右边距</p>
            <p>上边距</p>
            <p>下边距</p>
            <p>动作</p>
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ButtonPanel);