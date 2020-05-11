import React, { Component } from 'react';
import { Tabs, List, Button } from 'antd';
import axios from "axios"
import "./news.css"
const { TabPane } = Tabs;
export default class Bells extends Component {
	state = { loading: false, noread: [] ,haveread:[]};
	componentDidMount() {
        this.setState({ loading: true });
        this.getNotice();
    }
    getNotice(){
        let self = this;
		axios.get('http://localhost:4000/api/getAllNotice').then(firstdata=>{
            let allNotice = firstdata.data.data.list
            let have=[];
            let no = []
            console.log(firstdata)
             axios.get('http://localhost:4000/api/getreadNotice').then(data=>{
                for(let i = 0;i<allNotice.length;i++){
                    let isread = self.findthisId(allNotice[i]._id,data.data.data.list) 
                    if(isread) 
                        have.push(allNotice[i])
                    else 
                        no.push(allNotice[i])

                }
                setTimeout(() => {
                            this.setState({ loading: false, noread: no,haveread:have});
                }, 500);
            });
        });
    }
    setHaveRead(id){
        this.setState({ loading: true });
        // let self = this;
        axios.get('http://localhost:4000/api/setHaveRead?notice_id='+id).then(data=>{
            this.getNotice();
            setTimeout(() => {
                this.setState({ loading: false});
            }, 500);
        });
    }
    findthisId(id,idsobj){
        let found = false;
        idsobj.map((item,index)=> {
            if(id===item.notice_id){
                found = true; 
            }
        })
        return found;
    }
	render() {
		const { loading, noread, haveread } = this.state;
		return (
			<div className="shadow-radius">
				<Tabs defaultActiveKey="1" >
					<TabPane tab="未读消息" key="1">
						<List
							loading={loading}
							className="list-news"
							dataSource={noread}
							renderItem={item => (
								<List.Item key={item.id}>
									<div className="list-title">
										<span style={{ color: '#1890ff', cursor: 'pointer' }}>{item.title}</span>
									</div>
									<div className="list-time">{item.creat_date}</div>
									<Button  onClick={this.setHaveRead.bind(this,item._id)}>标为已读</Button>
								</List.Item>
							)}
						/>
					</TabPane>
                    <TabPane tab="已读消息" key="2">
						<List
							loading={loading}
							className="list-news"
							dataSource={haveread}
							renderItem={item => (
								<List.Item key={item.id}>
									<div className="list-title">
										<span style={{ color: '#1890ff', cursor: 'pointer' }}>{item.title}</span>
									</div>
									<div className="list-time">{item.creat_date}</div>
								</List.Item>
							)}
						/>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
