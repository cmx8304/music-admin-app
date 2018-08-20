import React, { Component } from 'react';
import {Transfer, Modal} from 'antd';

import Remote from '../Remote';

class MusicSelect extends Component {
    state = { 
        musicData: [],
        targetKeys: []
    };
    componentDidMount() {
        Remote(
            '/api/music/query',
            {
                method: 'GET'
            },
            //回调
            data => {
                this.setState({
                    musicData: data
                });
            }
        );
    }

    /**
     * 监听props的变化
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            targetKeys: nextProps.selectedKeys
        });
    }

    /**
     * 更新targetKeys的值
     */
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({
            targetKeys: nextTargetKeys
        });
    }

    handleSelectChange = (sourceSelectredKeys, targetSelectedKeys) => {
        this.setState({
            selectedKeys: [...sourceSelectredKeys,...targetSelectedKeys]
        });
    }
    render() {
        return (
            //Modal对话框，Transfer选择器
            <Modal
                //visible控制对话框打开或者关闭
                visible={this.props.visible}
                //onOk表示确定按钮
                onOk={() =>{
                    this.props.handlerSelectMusic(this.state.targetKeys);
                }}
                onCancel={()=>{
                    this.props.closeSelectMusic();
                }}
            >
                <Transfer
                    dataSource={this.state.musicData}
                    titles={['所有歌曲','已选歌曲']}
                    //显示在右侧框数据的key集合
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={item => item.title}
                    rowKey={record => record.id}
                />
            </Modal>
            
        );
    }
}

export default MusicSelect;