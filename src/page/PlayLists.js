import React, { Component } from 'react';
import {Table} from 'antd';
class PlayLists extends Component {
    //state 等于一个 json 对象，这个对象的属性是 data ，data 是一个数组
    //state 是 React 提供的一个内部属性，这个属性不能直接修改，它需要通过 set state 来进行修改，
    //然后这个属性的变化会触发页面的重新渲染，一般情况下，我们使用 state 来和页面进行数据交互
    state = {
        data:[]
    };
    componentDidMount() {
        fetch('/api/playlist/query',{
            //之请求数据用get
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        })
        .then(function(response){
            return response.json();
            })
        .then(data => {
            console.log(this.state.data);
            this.setState({
                data: data
            });
        });
    }
    render() {
        console.log(this.state.data);
        const columns = [
            {
                title:'歌单名称',
                dataIndex:'name',
                key:'name'
            },
            {
                title:'歌单封面',
                dataIndex:'cover',
                key:'cover'
            },
            {
                title:'歌单描述',
                dataIndex:'desc',
                key:'desc'
            }
        ];
        return (
            <Table
                columns = {columns}
                //找到上面的state属性
                dataSource = {this.state.data}
                //表示不分页
                pagination = {false}
                //提交数据id唯一，不会冲突
                rowKey = {record => record.id}

            />
        );
    }
}

export default PlayLists;