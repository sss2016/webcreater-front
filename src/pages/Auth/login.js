import React from 'react'
import {Form,Input,Icon, Button} from 'antd'
import {  message } from 'antd';
import { Link } from "react-router-dom";
import cookie from 'react-cookies'

import './login.css'
// import {render} from 'react-dom'
import axios from 'axios'
var Config = require('Config')
// axios.defaults.withCredentials = true
class LoginFrom extends React.Component{

    handleLoginSubmit = (e) => {
        //提交之前判断输入的字段是否有错误
        e.preventDefault();
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        let history = this.props.history;
        // **let history = this.props.history;**
        this.props.form.validateFields((errors,values)=>{
            if (!errors) {
                axios.post(Config.serverUrl+'/api/login', values)
                  .then(function (response) {
                    if(response.data.code===-200){
                        message.error(response.data.message)
                    }else{
                        cookie.save('user',response.data.data.user,{expires})
						cookie.save('userid',response.data.data.userid,{expires})
                        cookie.save('username',response.data.data.username,{expires})
                        localStorage.setItem('isLogin', '1');
                        message.success(response.data.message)
                        history.push('dashboard')
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                // console.log('Received values of form: ', values);
                // **history.push('/View');**
              }
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
                    
                            <Form onSubmit={this.handleLoginSubmit}>
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
                                validateStatus={passWordError ? "error" : ''}
                            >
                            {
                                getFieldDecorator('password',{
                                    rules:[{required:true,message:"Please input your Password!"}]
                                })(
                                    <Input.Password  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                            placeholder="Password"
                                    />
                                )
                            }
                            </Form.Item>
                            <Link to="register" style={{fontSize:'10px',marginBottom:10}}>还没账号?去注册</Link>
                            <Form.Item>
                                <Button
                                    size="large"
                                    style={{width:'100%'}}
                                    type="primary"
                                    htmlType="submit"
                                >登录
                                </Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
        )
    }
}
let LoginForm = Form.create()(LoginFrom);
export default LoginForm;
