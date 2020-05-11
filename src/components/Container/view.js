import React from "react";
import _ from "lodash";
import { Layout,Button,Icon } from 'antd';
import {getButtonDom,getContairDom,getImageDom,getCarouselDom} from '../../comDom';
import { WidthProvider, Responsive } from "react-grid-layout";
import {getWidgetsConfig} from '../../comconfig';
import Setting from "../ClickMenu/view";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import DragLayout from '../../DragLayout';
export default class Container extends React.Component {
  static defaultProps = {
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },//lg应该是 每行分为几列
    rowHeight: 20,
  };

    constructor(props) {
        super(props);
        this.state = {
          layouts: this.getFromLS("layouts") || {},
          widgets:props.widgets,
          visible:false,
          editing:[],
          setType:null,
          setKey:null
        }
    }
    onSetting(etype,ekey){
      this.setState({
          visible:true,
          setType:etype,
          setKey:ekey
      })
    }
    handleCancel = () => {
      this.setState({visible: false});
  
    };
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
    //   console.log('widgets')
    //   console.log(this.state.widgets)
    //   console.log('layouts')
    //  console.log(this.state.layouts)
      return _.map(this.state.widgets, (l, i) => {
      //   let option;
      // console.log(l);
      let component;
        if (l.type === 'button') {
          // option = getButtonDom();
          component=getButtonDom(l.configs);
        }else if (l.type === 'RQ') {
          component = getContairDom(l.configs);
        }else if (l.type === 'text') {
          // option = getPieChart();
        }
        else if (l.type === 'image') {
          component = getImageDom(l.configs);
        }
        else if (l.type === 'carousel') {
          component = getCarouselDom(l.configs);
        }
        return (
          <div key={l.i} data-grid={l} >
            <span  className="Chacha" onClick={this.onRemoveItem.bind(this, i)}>
            <Icon type="delete"   style={{ fontSize: '10px', color: '#000' }}/>
                </span>
            <span style={{position:"absolute",top:0,right:0,zIndex:1}} onClick={this.onSetting.bind(this, l.type,i)}>
              <Icon type="setting" theme="filled"  style={{ fontSize: '10px', color: '#000' }}/>
            </span>
            {component}
          </div>
        );
      });
    };
    componentWillReceiveProps(nextProps) {
      this.setState({widgets: nextProps.widgets});
  }
    onRemoveItem(i) {
      this.props.onRemoveItem(i)
      // this.setState({
      //   widgets: this.state.widgets.filter((item,index) => index !=i)
      // });
  
    }
    handleChangeWidgets(nextProps){
      this.setState({
        widgets:nextProps
      })
    }
    onLayoutChange(layout, layouts) {
      this.saveToLS("layouts", layouts);
      this.setState({ layouts });
    }
  render() {
    return (
      <div>
      <Setting visible={this.state.visible}
       setType={this.state.setType} 
       setKey={this.state.setKey} 
       handleCancel={this.handleCancel} 
       widgets={this.state.widgets}
       onWidgetsChange={
        (widgets)=>{
          this.handleChangeWidgets(widgets)}
      }
       >
       </Setting>
          <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={
                (layout, layouts) =>{
                    this.onLayoutChange(layout, layouts);
                  }
            }
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
      </div>
          
    );
  }
}