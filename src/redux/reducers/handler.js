import {getWidgetsConfig} from '../../configs/comconfig';
export function widgetsChangeHandler(oldWidgets,data){
    var newarr = oldWidgets;
    var layerInfo = data.layerinfo;
    console.log('widgetsChangeHandler',layerInfo)
    if(layerInfo&&layerInfo.level==1){
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].id = data.newcol.id;
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].layout=data.newcol.layout
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].configs.name=data.newcol.formname
    }else{
      newarr[data.row].cols[data.col].id = data.newcol.id;
      newarr[data.row].cols[data.col].layout=data.newcol.layout
    }
    return newarr
}
export function propertyChangeHandler(state,configs){
  var newarr = JSON.parse(JSON.stringify(state.widgets));
  var layerInfo = state.currentContainner;
  var setobj = state.setting.setobjInfo;
  console.log("将要改变",layerInfo.row,layerInfo.col,setobj,"为",configs)
  if(layerInfo&&layerInfo.level==1){
    
    if(setobj){
      newarr[layerInfo.row].cols[layerInfo.col].widgets[setobj.row].cols[setobj.col].configs =configs
      console.log('更新configs-----',newarr[layerInfo.row].cols[layerInfo.col].widgets[setobj.row])
    }
  }else{
    
    if(setobj)
      newarr[setobj.row].cols[setobj.col].configs=configs
    else{
      newarr[state.selection].configs=configs
    }
  }
  state.setting.configs = JSON.parse(JSON.stringify(configs));
  return newarr
}
export function layoutPropertyChange(state,configs){
  var newarr = state.widgets.concat();;
  var alterType=state.setting.setType
  var layerInfo = state.currentContainner;
  var setobj = state.setting.setobjInfo;
  if(layerInfo&&layerInfo.level==1){
      if(alterType=='row'){
        if(setobj)
          newarr[layerInfo.row].cols[layerInfo.col].widgets[setobj.row].configs =configs
        else{
          newarr[layerInfo.row].cols[layerInfo.col].widgets[state.selection].configs =configs
        }
      }
      else if(alterType=='container'){
        newarr.configs=configs
      }
  }else{
      if(alterType=='row')
        newarr[state.selection].configs=configs
      else if(alterType=='container'){
        newarr.configs=configs
      }
  }
  return newarr

}
export function widgetsAddHandler(state,type,layerInfo){
    let newcol = {};
    let additem  = getWidgetsConfig(type)
    let copycongig = JSON.parse(JSON.stringify(additem))
    console.log('新列',copycongig)
    let data = state.widgets;
    newcol.type = type;
    Object.assign(newcol,copycongig)
    if(layerInfo&&layerInfo.level==1){

        data[layerInfo.row].cols[layerInfo.col].widgets[state.selection].cols.push(newcol)
      }else{
        data[state.selection].cols.push(newcol)
      }
    return data;
}

export function lineAddHandler(oldWidgets,layerInfo){
    let newrow =   {
          name:'line3',
          cols:[],
          configs:{
            arrangeWay_x:1,
            arrangeWay_y:1,
            lineH:50,
            backColor:null,
            isAuto:true
          }
      }
      if(layerInfo&&layerInfo.level==1){
        oldWidgets[layerInfo.row].cols[layerInfo.col].widgets.push(newrow)
      }else{
        oldWidgets.push(newrow)
      }
        
      return oldWidgets;
  }
  export function setting_show(oldWidgets,selection,layerInfo,data){
    console.log(oldWidgets[layerInfo.row].cols)
    let configs=Object.assign({}, oldWidgets[layerInfo.row].cols[layerInfo.col].configs)
    if(layerInfo.level==1&&data.setType!='form')
      configs= oldWidgets[layerInfo.row].cols[layerInfo.col].widgets[data.setobjInfo.row].cols[data.setobjInfo.col].configs

    return{
        setType:data.setType,
        setVisible:data.setVisible,
        setobjInfo:data.setobjInfo,
        configs:JSON.parse(JSON.stringify(configs))
    }
  }