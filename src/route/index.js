import React from 'react';
import AppBody from '../components/layouts/layout';
import LoginFrom from '../pages/Auth/login'
import { HashRouter, Route, Switch } from 'react-router-dom'

export default class IndexRoute extends React.Component{
    render(){

        // console.log('this.props.c_history',this.props.c_history)
        // hashHistory.push(this.props.c_history)
        return(
            <HashRouter history={this.props.hashHistory}>
                <Switch>
                    <Route path='/' exact component={LoginFrom}/>
                    <Route path='/dashboard' exact component={AppBody}/>
                </Switch>
            </HashRouter>
        )
    }  
}