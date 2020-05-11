import React from 'react';
import {render} from 'react-dom';
import './index.css';
// import Mylayout from './components/layouts/layout'
import DevTools from './components/container/Devtool'
import { Provider } from "react-redux";
import reducer from './redux/reducers/index';
import {createStore,compose} from 'redux'
// import IndexRoute from './route/index'
import { renderRoutes } from 'react-router-config';
import { routes } from './route/router';
import { HashRouter } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies'
import * as serviceWorker from './serviceWorker';
// import { Router, Route, Switch } from 'react-router-dom';
axios.interceptors.request.use(config => {
    // 默认参数设置：所有接口都必须传的值（比如：userId）
    // 自定义header信息（比如token）
    console.log("拦截到")
    config.headers['user'] = cookie.load('user');
    config.headers['userid'] = cookie.load('userid');
    config.headers['username'] = cookie.load('username');
    config.headers['Content-Type'] = cookie.load('application/json');
    // 默认值与接口传来的参数进行合并（注：接口参数与默认值不可重复）
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
const enhancer = compose(
    DevTools.instrument()
  );
const store = createStore(reducer,enhancer)
render(  
    <Provider store={store}>
        <HashRouter>
            {renderRoutes(routes)}
        </HashRouter>
        {/* <DevTools></DevTools> */}
    </Provider>
    , document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
