import { Upload, Icon, Modal } from 'antd';
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class ImagePage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  }
  constructor(props){
    super(props)
    this.getImageList()
  }

  handleCancel = () => this.setState({ previewVisible: false });
  getImageList(){
    const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.get('http://localhost:4000/getMyimageList')
    .then(function (response) {
      console.log(response)
      _this.setState({
        fileList:response.data.data.list,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:4000/uploader"
          listType="picture-card"
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={
            {
              "username":cookie.load('username')
            }
          }
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
