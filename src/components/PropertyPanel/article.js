import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import { Select } from 'antd';
import axios from "axios"
const { Option } = Select;
class ArticlePanel extends React.Component {

  constructor(props){
      super(props)
      this.state={
        visible:false,
        articleList:[]
      }
  }
  componentDidMount(){
    axios.get('http://localhost:4000/api/getarticles').then((result)=>{
        this.setState({
            articleList:result.data.data.list
        })
        // console.log(result.data.data.list)
    })
  }
  getOption(){
    return this.state.articleList.map((d,i )=> <Option key={i}>{d.title}</Option>);
  }
  handleChange(e){
      let artile  = this.state.articleList[e]
      this.props.onSetProperty(artile)
  }
  render() {
    return (
        <div>
            <p>选择你要插入的文章</p>
            <div>
            <Select  style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                {this.getOption()}
            </Select>
            </div>
        
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ArticlePanel);