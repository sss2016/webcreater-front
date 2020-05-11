import { Modal, Button,Card } from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import ButtonPanel from './button'
import ArticlePanel from './article'
import ImagePanel from './Image'
import CarouselPanel from './carousel'
import RowPanel from './rowpanel'
import IFormPanel from './IForm'
import Formelement from './formelement'
class Setting extends React.Component {
  // state = {
  //   loading: false,
  //   value: 1,
  //   visible: false,
  //   setType:null,
  //   setObjInfo:null
  // };
  showMenuSet(){
    // console.log('theKey'+this.props.setKey)
    var source = this.props.setting
    if(!source||!source.setVisible) return null;
    console.log('isform_element',source.setType)

    var isform_element = source.setType.split('_')[0]=='form'?true:false;
    if (source.setType=='button')
    return (<ButtonPanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></ButtonPanel>)
    else if(source.setType=='image')
    return (<ImagePanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></ImagePanel>)
    else if(source.setType=='article')
    return(<ArticlePanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></ArticlePanel>)
    else if(source.setType=='carousel')
    return (<CarouselPanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></CarouselPanel>)
    else if(source.setType=='row')
    return(<RowPanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></RowPanel>)
    else if(source.setType=='form'){
      return(<IFormPanel onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs}></IFormPanel>)
    }else if(isform_element){
      console.log('source.setType',source.setType)
      return(<Formelement onUpdateConfig={(configs)=>{this.onSetProperty(configs)}} primitive={source.configs} p_type={source.setType}></Formelement>)
    }
    return null
  }
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  // handleOk = () => {
  //   let widgets = this.props.widgets
  //   let the_widget=widgets[this.props.setKey]
  //   the_widget.configs=this.refs.dataObj.getMyData()
  //   this.props.onWidgetsChange(widgets)
  //   // console.log(this.props.onWidgetsChange)
  //   // console.log(widgets)
  //   // console.log(this.getFromLS("layouts"))
  //   // this.setState({ loading: true });
  //   // setTimeout(() => {
  //   //   this.setState({ loading: false, visible: false });
  //   // }, 3000);
  // };
  onSetProperty(configs){
    this.props.onSetProperty(configs)
  }
  handleDel(){
    
  }
  handleCancel(){
      this.props.onShowSettingStyle({
        setVisible:false,
        setKey:null,
        setType:null
      });
  };
  render() {
    // const { loading } = this.state;
    const visible=this.props.setting?this.props.setting.setVisible:false;
    // const thisconfig=getMenuConfig(this.props.layout.setting.setType)
    let Component = 
    <Card
    size="small" title="属性设置面板" 
    extra={<span onClick={this.handleCancel.bind(this)} >close</span>} 
    style={{ width: '18%',marginLeft:'10px' }}
  >
    {this.showMenuSet()}

    <div>
       {/* <Button key="back" >
          取消
        </Button> */}
        {/* <Button key="submit" type="primary" onClick={this.handleDel.bind(this)}>
          删除元素
        </Button> */}
    </div>
  </Card>
    return (
        visible?Component:null
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting);
