import React, { Component } from 'react';
// import Emojify  from 'react-emojione';
class Facepanel extends Component {
    render() {
        return (
            <div className="face-panel" onClick={(e)=>{this.props.onSelectFace(e.target.firstChild)}}>
                <p>
                    <span>😀</span><span>😁</span><span>😂</span><span>😃</span>
                    <span>😄</span><span>😅</span><span>😆</span><span>😉</span><span>😊</span>
                </p>
                <p>
                    <span>😋</span><span>😎</span><span>😍</span><span>😘</span>
                    <span>😗</span><span>😙</span><span>😚</span><span>😇</span><span>😐</span>
                </p>
                <p>
                    <span>😑</span><span>😶</span><span>😏</span><span>😣</span>
                    <span>😥</span><span>😮</span><span>😯</span><span>😪</span><span>😫</span>
                
                </p>
                <p>
                    <span>😴</span><span>😌</span><span>😛</span><span>😜</span>
                    <span>😝</span><span>😒</span><span>😓</span><span>😔</span><span>😕</span>
                </p>
                <p>
                    <span>😲</span><span>😷</span><span>😖</span><span>😞</span>
                    <span>😟</span><span>😤</span><span>😢</span><span>😭</span><span>😦</span>
                
                </p>
                <p>
                    <span>😧</span><span>😨</span><span>😬</span><span>😰</span>
                    <span>😱</span><span>😳</span><span>😵</span><span>😡</span><span>😠</span>
                
                </p>
                
                {/* <Emojify  style={{height: 32, width: 32}} > */}
                    
                {/* </Emojify>  */}
                {/* <span className="face1">:wink: :D :100: :)</span> */}
            </div>
        );
    }
}

export default Facepanel;