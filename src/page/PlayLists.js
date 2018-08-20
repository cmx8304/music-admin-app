import React, { Component } from 'react';
import {Table} from 'antd';

import MusicSelect from '../component/MusicSelect';
import Remote from '../Remote';

class PlayLists extends Component {
    //state 等于一个 json 对象，这个对象的属性是 data ，data 是一个数组
    //state 是 React 提供的一个内部属性，这个属性不能直接修改，它需要通过 set state 来进行修改，
    //然后这个属性的变化会触发页面的重新渲染，一般情况下，我们使用 state 来和页面进行数据交互
    state = {
        data:[],
        //selectMusic 为是否打开 music 选择器的对话框，默认是 false ，selectMusicKeys是选中的 music 的 keys 。
        selectMusic: false,
        selectMusicKeys: []
    };
    componentDidMount() {
        // fetch('/api/playlist/query',{
        //     //之请求数据用get
        //     method:'GET',
        //     headers:{
        //         'content-type':'application/json'
        //     }
        // })
        // .then(function(response){
        //     return response.json();
        //     })
        // .then(data => {
        //     console.log(this.state.data);
        //     this.setState({
        //         data: data
        //     });
        // });
        this.fetch();
    }
    fetch(){
        Remote(
            '/api/playlist/query',
            {
                method: 'GET'
            },
            data => {
                this.setState({
                    data: data
                });
            }
        );
    }
    openSelectMusic = record =>{
        this.setState({
            selectMusic: true,
            playListId: record.id,
            selectMusicKeys: record.musicKeys
        });
    };

    closeSelectMusic = () => {
        this.setState({
            selectMusic: false,
            playListId: null,
            selectMusicKeys:[]
        });
    };

    //保存已选歌曲的数据触发该方法
    handlerSelectMusic = keys => {
        this.closeSelectMusic();
        Remote(
            '/api/playlist/update',
            {
                body:JSON.stringify({
                    id: this.state.playListId,
                    keys
                }),
                method: 'POST'
            },
            data => {
                this.fetch();
            }
        );
    };

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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return(
                        <span>
                            <a 
                            href="javascript:;" 
                            onClick={() => {
                                this.openSelectMusic(record);
                            }}>
                                选择歌曲
                            </a>
                        </span>
                    )
                }
            }
        ];
        return (
            <div>
                <Table
                    columns = {columns}
                    //找到上面的state属性
                    dataSource = {this.state.data}
                    //表示不分页
                    pagination = {false}
                    //提交数据id唯一，不会冲突
                    rowKey = {record => record.id}
                />
                <MusicSelect
                    //visible是控制这个对话框打开还是关闭
                    visible={this.state.selectMusic}
                    selectedKeys={this.state.selectMusicKeys}
                    handlerSelectMusic={this.handlerSelectMusic}
                    closeSelectMusic={this.closeSelectMusic}
                />
            </div>
        );
    }
}

export default PlayLists;