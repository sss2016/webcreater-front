import React from "react";
import _ from "lodash";
import { Layout,Button,Icon } from 'antd';
import {getButtonDom,getContairDom,getImageDom,getCarouselDom} from '../../comDom';
import { WidthProvider, Responsive } from "react-grid-layout";
import {getWidgetsConfig} from '../../comconfig';
import Setting from "../ClickMenu/view";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import DragLayout from '../../DragLayout';
export default class Generetor extends React.Component {
  // static defaultProps = {
  //   cols: { lg: 10, md: 30, sm: 6, xs: 4, xxs: 2 },//lg应该是 每行分为几列
  //   rowHeight: 20,
  // };
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    rowHeight: 20
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
    onLayoutChange(layout, layouts) {
      this.saveToLS("layouts", layouts);
      layouts.lg=layouts.md
      this.setState({ layouts });
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
            {component}
          </div>
        );
      });
    };
    componentWillReceiveProps(nextProps) {
      this.setState({widgets: nextProps.widgets});
  }

  render() {
    return (
      // <div>
          <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={
                (layout, layouts) =>{
                    console.log(layouts)
                    this.onLayoutChange(layout, layouts);
                  }
            }
            isDraggable={false}
            isResizable={false}
            // breakpoints={{
            //   lg: 3, 
            //   md: 4, 
            //   sm: 6,
            //   xs: 12
            // }}
            // breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            // cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
      // </div>
          
    );
  }
}