import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import ImageSel from '../ImageSel/view'

class ImagePanel extends React.Component {
  state={
    visible:false,
  }
  showSetImageBox(){
    this.setState({
      visible:true,
    })
  }
  onOk(obj){
    console.log(obj)
    this.props.onSetProperty(obj)
    this.setState({
      visible:false
    })
  }
  handleCancel(){
    this.setState({
      visible:false
    })
  }
  render() {
    let style = this.props.setting.configs.url?{
      backgroundImage:"url("+this.props.setting.configs.url+")",
      backgroundPosition:"0 0",
      backgroundSize:"100% 100%",
      backgroundColor:'transparent',
      with:100,height:100
    }:{with:100,height:100,backgroundColor:"#eee"}
    return (
        <div>
            <p>选择图片</p>
            <div style={style} onClick={this.showSetImageBox.bind(this)}></div>
            <ImageSel               
              visible={this.state.visible}
              onOk={(o)=>{this.onOk(o)}}
              onhandleCancel={
                ()=>{
                  this.handleCancel()
                }
              }> </ImageSel>
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ImagePanel);