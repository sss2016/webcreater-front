import React, { Component } from 'react';
import {Form} from 'antd';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import Containner from '../Dragging/container'
import _ from "lodash";
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
 
class IForm extends Component {
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

        return (
            <Form
            {...formItemLayout}
            name="basic"
            onSubmit={this.handleSubmit.bind(this)}
            style={{height:'100%',width:'100%'}}
            >
                <Containner layerinfo={this.props.layerinfo} mform={this.props.form} >

                </Containner>
            </Form>

        );

    }
}
const mForm = Form.create({ name: 'IForm' })(IForm);
export default connect(mapStateToProps,mapDispatchToProps)(mForm);