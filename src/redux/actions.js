import {CHANGE,ADD_WIDGET,ADD_LINE,SELECTROW,SETTINGSHOW,SET_CONTAINNER,SET_Field,SET_PROPERTY,SET_LAYOUT_PROPERTY} from './actionType'
export function changeLayout(payload){
  console.log('数据',payload)
  return{
    type:CHANGE,
    payload:payload
  }
}
export function el_add(payload){
  return{
    type:ADD_WIDGET,
    payload:payload
  }
}
export function line_add(payload){
  return{
    type:ADD_LINE,
    payload:payload
  }
}
export function row_select(payload){
  return{
    type:SELECTROW,
    payload:payload
  }
}
export function setting_show(payload){
  return{
    type:SETTINGSHOW,
    payload:payload
  }
}
export function containner_set(payload){
  return{
    type:SET_CONTAINNER,
    payload:payload
  }
}
export function pageFormField_set(payload){
  return{
    type:SET_Field,
    payload:payload
  }
}
export function layoutPropertyChange(payload){
  return{
    type:SET_LAYOUT_PROPERTY,
    payload:payload
  }
  
}
export function property_set(payload){
  return{
    type:SET_PROPERTY,
    payload:payload
  }
}