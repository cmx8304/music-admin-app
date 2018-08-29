import React, { Component } from 'react';
import {Table, Button} from 'antd';

import Remote from '../Remote';
import {withRouter} from 'react-router-dom';

/**
 * 歌曲列表
 */
class SongList extends Component {
    state = {  
        data: []
    };
    componentDidMount(){
        document.title = '歌曲列表';
        Remote(
            '/api/music/query',
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
    render() {
        const columns = [
            {
                title: '歌曲名称',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '歌曲URL',
                dataIndex: 'url',
                key: 'url'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (
                        <span>
                            <a
                                href="javascript:;"
                                onClick={() => {
                                    this.props.history.push('/songs?id=' + record.id);
                                }}
                            >
                            编辑
                            </a>
                        </span>
                    );
                }
            }
        ];
        return (
            <div>
                <div style={{marginBottom: 16,textAlign: 'left'}}>
                    <Button
                        type="primary"
                        onClick={() => {
                            this.props.history.push('/songs');
                        }}
                    >
                        上架
                    </Button>
                </div>
                <Table
                columns={columns}
                dataSource={this.state.data}
                rowKey={record => record.id}
                />
            </div>
        );
    }
}

export default withRouter(SongList);