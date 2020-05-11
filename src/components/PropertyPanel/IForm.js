import { Select} from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
class IFormPanel extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
        <div>
            <p>背景颜色</p>
            <p>背景图片</p>
            <p>表单提交成页面</p>
            <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                  <Option value="Yiminghe">yiminghe</Option>
            </Select>
        </div>
    );
  }
  }
export default connect(mapStateToProps,mapDispatchToProps)(IFormPanel);
