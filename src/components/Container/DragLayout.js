//未使用
import React, { PureComponent } from 'react';
import { Layout,Icon } from 'antd';
import {getButtonDom,getImageDom} from '../../comDom';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import {getWidgetsConfig} from '../../comconfig';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const {Content} = Layout;
//      .col-xs-* 超小屏幕如手机 （<768px）时使用；

//      .col-sm-* 小屏幕如平板 （768px ≤ 宽度 ＜992px）时使用；

//      .col-md-* 中等屏幕如普通显示器 （992px ≤ 宽度 ＜ 1200px）时使用；

//      .col-lg-* 大屏幕如大显示器 （≥1200px）时使用。
export default class DragLayout extends
PureComponent {
  static defaultProps = {
    cols: { lg: 10, md: 30, sm: 6, xs: 4, xxs: 2 },//lg应该是 每行分为几列
    rowHeight: 20,
  };

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[],
      visible:false
    }
  }
  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
    //   let option;
    let component;
      if (l.type === 'button') {
        // option = getButtonDom();
        component=getButtonDom();
      }else if (l.type === 'image') {
        component = getImageDom();
      }else if (l.type === 'text') {
        // option = getPieChart();
      }
      return (
        <div key={l.i} data-grid={l} className="widgetsOut">
          <span  className="Chacha" onClick={this.onRemoveItem.bind(this, i)}>
          <Icon type="delete"   style={{ fontSize: '10px', color: '#fff' }}/>
              </span>
          <span style={{position:"absolute",top:0,right:0,zIndex:1}} onClick={this.onSetting.bind(this, i)}>
            <Icon type="setting" theme="filled"  style={{ fontSize: '10px', color: '#fff' }}/>
          </span>
          {component}
        </div>
      );
    });
  };



  onRemoveItem(i) {
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item,index) => index !=i)
    });

  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  onSetting(i){
    this.setState({
        visible:true
    },() => {
        console.log(this.state.visible);
    })
    
  }
  handleCancel = () => {
    this.setState({visible: false});
  };
  render() {
   return(
      <Content style={{ marginTop: 44,width:'100%',height:100,flexDirection:"row",display:'flex' }}>
        <div style={{ background: '#fff', padding: 20, minHeight: 800 ,width:"80%"}}>
          <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={
                (layout, layouts) =>{
                    this.onLayoutChange(layout, layouts);}
            }
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Content>
   )}
}