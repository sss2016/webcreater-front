import React, { Component } from 'react';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import _ from "lodash";
import $ from 'jquery';
import 'antd/dist/antd.css';
import './front.css';
import Dragging from './dragging'
class Container extends Component {
 
    // LayoutChangeHandler(data){
    //     this.props.onChangeWidgets(data)
    //     // this.props.selectOne(newarr[data.row].cols[data.col].type);
    // }
    removeHandler(r,c){

        this.props.onRemoveItem(r,c);
    }
    constructor(props){
        super(props)
        this.state={
            layerinfo:this.props.layerinfo||{
                level:0, //判断该容器是几级容器，目前只有两级  0 为 顶级容器，1为 下层容器 如表单嵌入
                            //该容器在常规组件数组的位置  第几行第几列
                row:0,
                col:0
            }
        }
    }
    onSelectRow(row,e){

        var selector = e.target;
        if(!$(selector).hasClass('line')) return;
        $('.line').css({
            border:'none',
            borderBottom:'1px solid #8899BB'
        })
        selector.style.border='1px dashed #000'
        let rowstyle = {
            row:row,
            layerinfo:this.state.layerinfo
        }
        this.props.onSelectRow(rowstyle);
    }
    createEl(){
        let boxarrangeWay = ['left','center','right']
        let flexarrangeWay=[' flex-start','center','flex-end']
        let formColname = []
        let formindex = 0;
        let row = this.state.layerinfo.row;
        let col = this.state.layerinfo.col
        let level = this.state.layerinfo.level
        let widgets = this.state.layerinfo.level==1?this.props.widgets[row].cols[col].widgets:this.props.widgets
        var allComponent = _.map(widgets, (l, i) => {
                let h = l.cols.length<1?100:'auto';
                console.log('gao',h)
                let style =!l.configs.isAuto?{
                    height:l.configs.lineH,
                    display:'flex',
                    alignItems:flexarrangeWay[l.configs.arrangeWay_y-1],
                    justifyContent:flexarrangeWay[l.configs.arrangeWay_x-1],
                }:{
                    height:h,
                    textAlign:boxarrangeWay[l.configs.arrangeWay_x-1]
                }
 
              return(
                  <div className='line' iname={l.name} key={i} style={style} onClick={this.onSelectRow.bind(this,i)}>
                      {
                      _.map(l.cols,(v,k)=>{
                        let colstyle;
                        if(v.type=='article') colstyle = {
                            width:'100%'
                        }
                        if(v.configs.label) {
                            v.configs.name='formEl'+(formindex++)
                            formColname.push(v.configs.label)
                        }
                        return(  
                         <div className='col' key={k} style={colstyle} >
                             <Dragging 
                             row={i} col={k} 
                             ikey={level+''+row+''+col+''+i+''+k} 
                             dragdatas={v} parentlayerinfo={this.state.layerinfo}
                             mform={this.props.mform}
                             onLayoutChange={(data)=>{
                               this.props.onChangeWidgets(data);
                            }}
                            onInit={(data)=>{
                                this.props.onChangeWidgets(data);
                            }}
                            onRemoveItem={(r,c)=>{
                                this.removeHandler(r,c)
                            }}
                        ></Dragging>
                        </div>
                        )
                      })
                      }
                  </div>
              )
          })

          this.saveToLS('formColname',formColname)
          return allComponent;
      }

    
      saveToLS(key, value) {
        if (global.localStorage) {
          global.localStorage.setItem(
            key,value
          );
        }
      }
      onSetCurrentContainner(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        console.log('设置了容器',this.state.layerinfo)
        $('.template-img-wrap').css({border:'1px solid black'})
        $(e.target).css({border:'1px dashed red'})
        this.props.onSetCurrentContainner(this.state.layerinfo)
      }
    render() {
            if(this.state.layerinfo.level==1)
                console.log('渲染内部容器')
        return (
                <div className="template-img-wrap"  onClick={this.onSetCurrentContainner.bind(this)}
                style={{width:'100%',height:'100%',border:'1px solid #333'}}>
                   {this.createEl()}
                </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Container);
