import React, { Component } from 'react';
import { Modal } from 'antd';
import "./index.css"
import axios from 'axios'
class ImageSel extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:props.visible,
            selectObj:null,
            imglist:[]
        }
    }
    componentDidMount(){
        this.getImageList()

    }
    selectedImg(e){
        var p = document.getElementsByClassName('imgbox')
        var p_node = e.target.parentNode
        for(let i = 0;i<p.length;i++){
            p[i].style.borderColor="#eee"
        }
        p_node.style.borderColor="blue";
        let selindex= parseInt(p_node.getAttribute('ikey'))
        this.setState({
            selectObj:this.state.imglist[selindex]
        })
    }
    handleOk(){
        this.props.onOk(this.state.selectObj)
    }
    handleCancel(){
        this.props.onhandleCancel();
    }  
    getImageList(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.get('http://localhost:4000/getMyimageList')
        .then(function (response) {
          console.log(response)
          _this.setState({
            imglist:response.data.data.list,
          });
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    generateList(imglist){
       return imglist.map((item,index)=>{
            return (
                <div className="content-box" key={index}>
                    <div className="imgbox" onClick={this.selectedImg.bind(this)} ikey={index} >
                        <img src={item.url} alt="轮播"></img>

                    </div>
                    <p className="imgname">{item.name}</p>
                </div>
            )
        })
    }
    render() {
        const {imglist} = this.state
        return (
            <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
            <div className="imglist">
                {this.generateList(imglist)}
            </div>

        </Modal>
        );
    }
}

export default ImageSel;