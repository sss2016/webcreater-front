import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
class TextPanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>文本类型</p>
            {/* <p>
            <Radio.Group >
                <Radio value={1}>primary</Radio>
                <Radio value={2}>default</Radio>
                <Radio value={3}>dashed</Radio>
                <Radio value={4}>Danger</Radio>
                <Radio value={5}>Link</Radio>
            </Radio.Group>
            </p> */}
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TextPanel);

 