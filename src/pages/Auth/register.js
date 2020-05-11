import React from 'react'
import {Form,Input,Icon, Button} from 'antd'
import { message } from 'antd';
import './login.css'
// import {render} from 'react-dom'
import axios from 'axios'
import { Link } from "react-router-dom";

var Config = require('Config')
// axios.defaults.withCredentials = true
class RegForm extends React.Component{

    handleRegSubmit = (e) => {
        //提交之前判断输入的字段是否有错误
        e.preventDefault();
        let history = this.props.history;

        // **let history = this.props.history;**
        this.props.form.validateFields((errors,values)=>{
            if (!errors) {
                axios.post(Config.serverUrl+'/api/register', values)
                  .then(function (response) {
                    if(response.data.code===-200){
                        message.error(response.data.message)
                    }else{
                        message.success(response.data.message)
                        history.push('/')
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                // console.log('Received values of form: ', values);
                // **history.push('/View');**
              }
                // **history.push('/View');**
              
        })
    }
    render(){
        //Form.create 包装的组件会自带this.props.form属性，该属性提供了一系列API，包括以下4个
        //getFieldDecorator用于和表单进行双向绑定
        //isFieldTouched判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger(收集子节点的值的时机，默认时onChange)
        //getFieldError获取某个输入控件的 Error
        //获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('username') && getFieldError('username');
        const passWordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="login">
                <div className="login-form">
                   
                        <Form onSubmit={this.handleRegSubmit}>
                            {/* 一个FromItem中放一个被 getFieldDecorator 装饰过的 child */}
                            <Form.Item
                                validateStatus={userNameError ? 'error' : ''}//validateStatus为校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
                            >
                            {
                                getFieldDecorator('username',{
                                    rules:[{required:true,message:"Please input your username!"}]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                            placeholder="Username"
                                    />
                                )
                            }
                            </Form.Item>
                            <Form.Item
                            >
                            {
                                getFieldDecorator('email',{
                                    rules:[{required:true,message:"Please input your email!"}]
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                            placeholder="email"
                                    />
                                )
                            }
                            </Form.Item>
                            <Form.Item
                                validateStatus={passWordError ? "error" : ''}
                            >
                            {
                                getFieldDecorator('password',{
                                    rules:[{required:true,message:"Please input your Password!"}]
                                })(
                                    <Input.Password   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                            placeholder="Password"
                                    />
                                )
                            }
                            </Form.Item>
                            <Link to="/">已有账号？去登录</Link>
                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >注册
                                </Button>
                            </Form.Item>
                        </Form>
    
                   
                </div>
            </div>
        )
    }
}
export default Form.create()(RegForm);