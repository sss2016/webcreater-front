import React from 'react';
import AppBody from '../components/layouts/body';
import DesignMan from '../pages/myDesign';
import IMQQ from '../components/IMQQ/view'
import ImagePage from '../pages/image'
import Bells from '../pages/bells'
import Editor from '../pages/editor'
import Articles from '../pages/articles'
import Forms from '../pages/forms'
import Welcome from '../pages/welcome'
import Submits from '../pages/submits'
import { Route, Switch } from 'react-router-dom'

export default class DashRoute extends React.Component{
    render(){

        // console.log('this.props.c_history',this.props.c_history)
        // hashHistory.push(this.props.c_history)
        return(
                <Switch>
                    <Route path='/dashboard/' exact component={Welcome}/>
                    <Route path='/dashboard/a' exact component={AppBody}/>
                    <Route path='/dashboard/mydesign' exact component={DesignMan}/> 
                    <Route path='/dashboard/myim' exact component={IMQQ}/> 
                    <Route path='/dashboard/images' exact component={ImagePage}/>
                    <Route path='/dashboard/editor' exact component={Editor}/>
                    <Route path='/dashboard/articles' exact component={Articles}/>
                    <Route path='/dashboard/myforms' exact component={Forms}/>
                    <Route path='/dashboard/bellcenter' exact component={Bells}/>
                    <Route path='/dashboard/formsubmits/:f_id' exact component={Submits}/>
                </Switch>
        )
    }  
}