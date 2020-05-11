import {Checkbox} from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import SelectPanel from '../PropertyPanel/select'
import { Radio,Input  } from 'antd';
const requireselect = ['form_select','form_checkbox','form_radio']
class Formelement  extends React.Component{

  getSpecialStyle(type){
    console.log('类型',type)
    if(requireselect.indexOf(type)!=-1){
      return(<SelectPanel>
        
        </SelectPanel>)
    }
  }
    updateLabelName(e){
    this.props.primitive.label = e.target.value
    this.props.onSetProperty(this.props.primitive)
    }
    setIsRequired(e){
        this.props.primitive.isRequired = e.target.checked
        this.props.onSetProperty(this.props.primitive)
    }
  render() {
    const primitive = this.props.primitive
    const type = this.props.p_type
    return (
      <div>
        <p>字段名称</p>
        <Input placeholder="设置名称" defaultValue={primitive.label} onBlur={this.updateLabelName.bind(this)} />
        <p>规则</p>
        <Checkbox onChange={this.setIsRequired.bind(this)} defaultChecked={primitive.isRequired}>必选</Checkbox>
        <p>选择项</p>
        {this.getSpecialStyle(type)}
      </div>
    )

  }

}
export default connect(mapStateToProps,mapDispatchToProps)(Formelement);
