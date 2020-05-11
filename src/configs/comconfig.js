import React from 'react';

const option={
    'button':{w: 100, h: 30, minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{buttonStyle:1,font:''}
    },
    'image':{w: 100, h: 100, minW: 50, maxW: 50,minH:50,maxH:50,
        configs:{url:null,name:''}
    },
    'carousel':{w: 300, h: 200, minW: 300, maxW: 1600,minH:200,maxH:500,
        configs:{images:[null,null,null,null],font:''}
    },
    'article':{
        w: 300, h: 30, minW: 300, maxW: 1600,minH:30,maxH:500,
        configs:{content:'空',title:'未选择文章'}
    },
    'form':{w: 300, h: 400, minW: 300, maxW: 1600,minH:200,maxH:500,
        configs:{buttonStyle:1,font:''},widgets:[]
    },
    'form_submit':{w: 100, h: 30, minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{label:'submit',name:'submit',isRequired:false}
    },
    'form_input':{w: 200,  minW: 200, maxW: 400,minH:50,maxH:70,h:50,
        configs:{label:'input',name:'input',isRequired:false}
    },
    'form_select':{w: 100,  minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{label:'select',name:'select',data:[
            'Racing car .',
            'Japanese',
            'Australian.',
            'Man charged.',
            'Los Angeles.',
            'Los Angeles.',
        ],isRequired:false}
    },
    'form_datepacker':{w: 100,  minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{label:'datepacker',name:'datepacker',isRequired:false}
    },
    'form_radio':{w: 100,  minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{label:'radio',name:'radio',data:[],isRequired:false}
    },
    'form_checkbox':{w: 100,  minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{label:'checkbox',name:'checkbox',data:[],isRequired:false}
    },
}

export function getObjectModel(type){


}
export function getWidgetsConfig(type){

    return option[type];
}