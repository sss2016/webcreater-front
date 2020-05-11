import {Slider} from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import { Radio,Input  ,Button,Switch } from 'antd';
class RowPanel extends React.Component {
    configs={}
    constructor(props) {
        super(props);
        this.configs = this.props.setting.configs
    }
    arrangeWayX(e){
      this.configs.arrangeWay_x = e.target.value
      this.props.onSetLayoutProperty(this.configs)
    }
    arrangeWayY(e){
      this.configs.arrangeWay_y = e.target.value
      this.props.onSetLayoutProperty(this.configs)
    }
    changeisAuto(value){
      this.configs.isAuto = !value
      this.props.onSetLayoutProperty(this.configs)
    }
    changeLineHight(value){
      this.configs.lineH = value
      this.props.onSetLayoutProperty(this.configs)
    }
    getYset(){
      return(
        <div>
        <p>行高</p>
              <Slider
                min={50}
                max={200}
                onChange={this.changeLineHight.bind(this)}
                value={this.configs.lineH}
              />
        <p>Y轴 对齐方式(仅固定行高时有效)</p>
        <div style={{marginBottom:10}} >
            <Radio.Group value={this.configs.arrangeWay_y} onChange={this.arrangeWayY.bind(this)}>
              <Radio value={1}>默认</Radio>
              <Radio value={2}>居中对齐</Radio>
              <Radio value={3}>底部对齐</Radio>
            </Radio.Group>
        </div>
        </div>
        )
    }
  render() {  
    return (
        <div>
  
            <p>X轴 对齐方式</p>
              <div style={{marginBottom:10}} >
                  <Radio.Group value={this.configs.arrangeWay_x} onChange={this.arrangeWayX.bind(this)}>
                    <Radio value={1}>左对齐</Radio>
                    <Radio value={2}>居中对齐</Radio>
                    <Radio value={3}>右对齐</Radio>
                  </Radio.Group>
              </div>
 
              <p>自定义行高</p>
              <Switch onChange={this.changeisAuto.bind(this)} />
             {!this.configs.isAuto&&this.getYset()}
             <p>操作</p>
             <Button size='small' type="danger">删除此行</Button>
             {/* <div>
              <Slider
                min={1}
                max={20}
                onChange={this.onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
              />
             </div> */}
        </div>
    );
  }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(RowPanel);
