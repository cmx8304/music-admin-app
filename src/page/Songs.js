import React, { Component } from 'react';
import {Form, Input, Button, Modal, Upload, message, Icon} from 'antd';

import Remote from '../Remote';
import queryString from 'query-string';

const FormItem = Form.Item;
const {TextArea} = Input;

//这个props是用于upload上传组件的配置
//music与Server.js里的upload.single('music')里的music一致
const props = {
    name:'music',
    action:'/upload/',
    onChange:info =>{
        if(info.file.status !=='uploading'){
            console.log(info.file,info.fileList);
        }
        if(info.file.status ==='done'){
            console.log(info.file.response.path);
            message.success(`${info.file.name}file uploaded successfully`);
        }else if(info.file.status ==='error'){
            message.error(`${info.file.name} file upload failed.`);
        }    
      }
    };

class Songs extends Component {
    state = {
        id: null
    };
    componentWillMount() {
        document.title = "歌曲管理";
        //?id=XXX，使用queryString来完成url的解析
        const id = queryString.parse(window.location.search).id;
        if(!id){
            return;
        }
        this.setState({id});
        Remote(
            '/api/music/query?ids=' + JSON.stringify([id]),
            {method: 'GET'},
            data => {
                this.props.form.setFieldsValue({
                    title: data[0].title
                });
            }
        );
    }

    handleSubmit = e =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                console.log('Received values of form:',  values);
                const body = {
                    id: this.state.id,
                    title: values.title,
                    url: values.file.file.response.filename
                };
                Remote(
                    '/api/music/add',
                    {
                        body: JSON.stringify(body),
                        method: 'POST'
                    },
                    data => {
                        console.log(data);
                    }
                );

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol : {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        };
        
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="歌曲名称" {...formItemLayout}>
                    {getFieldDecorator('title',{
                        rules: [
                            {
                                required: true,
                                message: '请输入歌曲的名称！'
                            }
                        ]
                    })(<Input placeholder="请输入歌曲的名称"/>)}
                </FormItem>
                <FormItem label="上传歌曲" {...formItemLayout}>
                    {getFieldDecorator('file',{
                        rules: [
                            {
                                required: true,
                                message: '请上传歌曲！'
                            }
                        ]
                    })(<Upload {...props}>
                        <Button>
                            <Icon type="upload"/> Click to Upload
                        </Button>
                    </Upload>)}
                </FormItem>
                <FormItem>
                <Button type="primary" htmlType="submit">
                        保存
                </Button>
                </FormItem>

            </Form>
        );
    }
}

export default Form.create()(Songs);