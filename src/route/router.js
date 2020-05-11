import React from 'react';
import AppBody from '../components/layouts/body';
import DesignMan from '../pages/myDesign';
import IMQQ from '../components/IMQQ/view'
import ImagePage from '../pages/image'
import LoginFrom from '../pages/Auth/login'
import RegForm from '../pages/Auth/register'
import Mylayout from '../components/layouts/layout';

import Editor from '../pages/editor'
import Articles from '../pages/articles'
import Forms from '../pages/forms'
import Submits from '../pages/submits'
const routes = [
    {
        path: '/',
        component: LoginFrom,
        exact: true,
    },
    {
        path: '/register',
        component: RegForm,
        exact: true,
    },
    {
        path: '/dashboard',
        component: Mylayout,
        children: [
            {
                path: '/dashboard/a',
                component: AppBody
            },
            {
                path: '/dashboard/myim',
                component: IMQQ
            },
            {
                path: '/dashboard/images',
                component: ImagePage
            },
            {
                path: '/dashboard/editor',
                component: Editor
            },
            {
                path: '/dashboard/forms',
                component: Forms
            },
            {
                path: '/dashboard/articles',
                component: Articles
            },
            {
                path: '/dashboard/submits',
                component: Submits
            },
            {
                path: '/dashboard/',
                component: DesignMan
            }
        ]
    }
    
    
];
 
export {routes}