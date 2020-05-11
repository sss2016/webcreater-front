import React, { Component } from 'react';

class ImageBox extends Component {
    render() {
        return (
            <div className="imgbox">
                <img src={this.props.url} alt=""/>
            </div>
        );
    }
}

export default ImageBox;