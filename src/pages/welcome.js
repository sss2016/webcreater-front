import React,{Component} from 'react'
import {Card} from 'antd'
//按需导入
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
//引入样式

class Welcome extends Component {

    getOption = ()=>{
        let option = {
            title: {
                text: '访问详情',
                x: 'center'
            },
            tooltip:{
                trigger: 'axis'
            },
            legend: {
                // orient: 'vertical',
                top: 20,
                right: 50,
                data:['浏览','表单提交']
            },
            xAxis: {
                data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name:'浏览',
                    type:'line',
                    data:[800, 1300, 2000, 2300, 1800, 1100, 500]
                },
                {
                    name:'表单提交',
                    type:'line',
                    data:[1000, 1800, 2200, 3100, 2200, 1500, 1000]
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <Card.Grid className="line_c" style={{width:'100%'}}>
                <ReactEcharts option={this.getOption()}/>
            </Card.Grid>
        )
    }
}
export default Welcome;