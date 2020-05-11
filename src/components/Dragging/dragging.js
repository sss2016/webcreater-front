import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import $ from 'jquery';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import {getButtonDom,getFormDom,getImageDom,getCarouselDom,
	getForm_checkbox,getForm_select,getForm_datepicker,
	getForm_radio,getForm_submit,getForm_input,getArticleDom
} from '../../configs/comDom';

class Dragging extends Component {
	data={
		needUpdate:false
	}
	constructor(props){

		super(props)

		var self = this;
		$(document).click(function(){
			$('.box').css({borderColor:'transparent'})
		})
		$('#vHTML').mouseup(function(){
			if(self.data.needUpdate){
				self.data.needUpdate=false;
				self.props.onChangeWidgets(
					self.getmyposition()
				)

			}

		})
		this.state = {
			width: props.dragdatas.w,
			height: props.dragdatas.h
		  }
	}
	
	componentDidMount(){
		this.props.onInit(this.getmyposition())

	}
	getmyposition(){
		var size = {
			width:this.state.width,
			height:this.state.height
		}
		let outW = this.props.currentContainner.width||$('#vHTML').width();
		console.log("outW-----",this.props.currentContainner)
		let width = Math.round(size.width/outW*100)+'%'
		let height = size.height
		let pos ={
			layerinfo:this.props.parentlayerinfo,
			row:this.props.row,
			col:this.props.col,
			newcol:{
				id:this.props.ikey,
				layout:{
					width:width,
					height:height,
					marginleft:0,
					margintop:0
				},
				formname:this.props.dragdatas.configs.name
			}
		}
		return pos;
	}


	getMyStyleByType(){
		let Tagdata =this.props.dragdatas;
		let type = Tagdata.type;
		let component;
		let posInArray = {
			level:1,
			row:this.props.row,
			col:this.props.col,
			mform:this.props.mform
		}
		let model= 'dev'
		switch (type) {
			case 'button':
				component=getButtonDom(Tagdata,model);
				break;
			case 'carousel':
				component=getCarouselDom(Tagdata,model);
				break;
			case 'image':
				component=getImageDom(Tagdata,model);
				break;
			case 'article':
				component=getArticleDom(Tagdata,model);
				break;
			case 'form':
				component = getFormDom(Tagdata,posInArray,model);
				break;
			case 'form_input':
				component = getForm_input(Tagdata,posInArray,model);
				break;
			case 'form_datepicker':
				component = getForm_datepicker(Tagdata,posInArray,model);
				break;
			case 'form_select':

				component = getForm_select(Tagdata,posInArray,model);
			break;
			case 'form_submit':
				component = getForm_submit(Tagdata,posInArray,model);
				break;
			case 'form_radio':
				component = getForm_radio(Tagdata,posInArray,model);
				break;
			case 'form_checkbox':
				component = getForm_checkbox(Tagdata,posInArray,model);
				break;	
			default:
				component=null;
				break;
		}
		console.log('大动静啊还是')
		return component;
	}
	selectWidget(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		console.log('danji')
		$('.box').css({borderColor:'transparent'})
		$(e.target.parentNode).css({borderColor:'red'})
		let Tagdata =this.props.dragdatas;
		let type = Tagdata.type;
		console.log(type)

		this.props.onShowSettingStyle({
			setType:type,
			setVisible:true,
			setobjInfo:{
				row:this.props.row,
				col:this.props.col,
			}
		})
	}
	onResize = (event, { element, size }) => {
		this.data.needUpdate=true;
		this.setState({ width: size.width, height: size.height });
	  };
	render() {
		// return (
		// 	<div id={this.props.ikey} 
		// 	className='block'
		// 	onClick={this.selectWidget.bind(this)}
		// 	style={{position:'relative',display:'inline-block',margin:'2px',border:'solid 1px green',
		// 		height:defaultstyle.h,width:defaultstyle.w
		// 	}}>
		// 			{this.getMyStyleByType()}

        //     </div>
		// );
		return(
			<Resizable className="box"    
			
			minConstraints={[this.props.dragdatas.minW,this.props.dragdatas.minH]} 
			maxConstraints={[this.props.dragdatas.maxW,this.props.dragdatas.maxH]} 
			height={this.state.height} width={this.state.width} onResize={this.onResize}>
				<div className="box" style={{ width: this.props.dragdatas.type==='article'?"100%":this.state.width, height: this.state.height}}
				onClick={this.selectWidget.bind(this)}
				>
					{this.getMyStyleByType()}
				</div>
          </Resizable>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dragging);