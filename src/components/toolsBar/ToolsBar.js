import React , { PureComponent }from 'react';
import { Button } from 'antd';
import { Collapse } from 'antd';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
const { Panel } = Collapse;
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  
 class ToolsBar extends PureComponent{
    constructor(props) {
        super(props);

    }
      addCol(type){
        if(this.props.selection==null) return false;
        this.props.onAddWidgets(type)
      }
      onRemoveItem(r,c){
        let newWigets=this.state.widgets;
        newWigets[r].cols.splice(c,1)
        this.setState(
            {
              visible:false,
            widgets: [...newWigets]
            }
          );
      }
      onRemoveLine(r){
        let newWigets=this.state.widgets.filter((item,index) => index !=r)
        this.setState(
            {
            widgets: newWigets
            }
          );
    
      }
      onSelectRow(r){
        this.setState({
          selection:r
        })
      }
    
    render(){
        return(
            <Collapse defaultActiveKey={['1']} >
                    <Panel header="基础组件" key="1">
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.props.onAddLine}>添加行</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'button')}>按钮</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'image')}>图片</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'article')}>文章</Button>
                    </Panel>
                    <Panel header="表单" key="2">
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form')}>表单</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_input')}>文本框</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_select')}>选择框</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_submit')}>提交按钮</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_datepicker')}>日期选择器</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_radio')}>单选按钮</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'form_checkbox')}>复选框</Button>
                    </Panel>
                    <Panel header="展示" key="3" >
                            <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addCol.bind(this,'carousel')}>轮播图</Button>
                    </Panel>
            </Collapse>
        )

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ToolsBar)