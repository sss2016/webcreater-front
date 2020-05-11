import {CHANGE,ADD_LINE,ADD_WIDGET,SELECTROW,SETTINGSHOW,SET_CONTAINNER,SET_Field,SET_PROPERTY,SET_LAYOUT_PROPERTY} from '../actionType';
import {widgetsChangeHandler,widgetsAddHandler,lineAddHandler,setting_show,propertyChangeHandler,layoutPropertyChange} from './handler'
export function layout(
    state={    
            widgets:[]
            ,selection:null,
            setting:{setKey:null,setVisible:false,setType:null},
            currentContainner:{
                level:0,
                row:0,
                col:0
            },
            formFiled:[]
        }
    
    ,action){
    let newwidgets;
    switch (action.type) {
        case CHANGE :
            // console.log('action',action.payload,'state',state)
            // var newstate = [...state]
            newwidgets =widgetsChangeHandler(state.widgets,action.payload,state.currentContainner)
            return {
                widgets:[...newwidgets],
                currentContainner:state.currentContainner,
                selection:state.selection,
            }
        case ADD_WIDGET:
            // console.log('action',action.payload,'state',state)
            newwidgets =widgetsAddHandler(state,action.payload,state.currentContainner)
            // var newstate = [...state]
            return {
                selection:state.selection,
                widgets:[...newwidgets],
                currentContainner:state.currentContainner
            }
        case ADD_LINE:
            console.log('ADD_LINE',state)
            newwidgets= lineAddHandler(state.widgets,state.currentContainner)
            return {
                widgets:[...newwidgets],
                currentContainner:state.currentContainner
            }
        case SELECTROW:
            let configs;
            let layerinfo = action.payload.layerinfo
            if(layerinfo.level==0){
                configs = state.widgets[action.payload.row].configs
            }else{
                configs = state.widgets[layerinfo.row].cols[layerinfo.col].widgets[action.payload.row].configs
            }
            return {
                selection:action.payload.row,
                widgets:state.widgets,
                setting:{
                    setKey:null,
                    setVisible:true,
                    setType:'row',
                    configs:configs
                },
                currentContainner:layerinfo
            };
        case SETTINGSHOW:
            let setting = setting_show(state.widgets,state.selection,state.currentContainner,action.payload)
            return {
                setting:setting,
                widgets:state.widgets,
                selection:state.selection,
                currentContainner:state.currentContainner
            }
        case SET_CONTAINNER:
            console.log('SET_CONTAINNER',action.payload)
            let c_container = action.payload;
            let ppouter = state.widgets[action.payload.row].cols[action.payload.col]
            if(ppouter){
                c_container.width = ppouter.w
            }
            return Object.assign({},state, {
                currentContainner:c_container,
            })
        case SET_Field:
            state.formFiled = action.payload
            return {
                setting:state.setting,
                widgets:state.widgets,
                selection:state.selection,
                currentContainner:state.currentContainner,
            }
        case SET_PROPERTY:
            newwidgets = propertyChangeHandler(state,action.payload)
            return {
                setting:state.setting,
                widgets:[...newwidgets],
                selection:state.selection,
                currentContainner:state.currentContainner,
            }
        case SET_LAYOUT_PROPERTY:
            layoutPropertyChange(state,action.payload)
            return {
                setting:state.setting,
                widgets:[...state.widgets],
                selection:state.selection,
                currentContainner:state.currentContainner,
            }
        default:
            return state;
    }
}

export function message(state={},action){
    switch (action.type) {
        case 'RECEIVE':
            // var newstate = [...state]
        return state;
    
        default:
            return state;
    }
}