import React, { Component } from 'react';
//添加三个依赖
import {Form, Input, Button} from 'antd';

//创建Form、FormItem实例
const FormItem = Form.Item;
const { TextArea } = Input;

/**
 * 歌单管理
 */
class PlayList extends Component {
    componentWillMount() {
        document.title = "歌单管理";
    }

    //一个参数可以省略括号
    handleSubmit = e =>{
        e.preventDefault();
        //调用Form的校验器
        this.props.form.validateFieldsAndScroll((err,value) => {
            if(!err){
                console.log('Received values of form',value);
            }
        });
    };

    //渲染
    render() {
        const {getFieldDecorator} = this.props.form;
        //formItemLayout 是表单项布局，表单项布局分两类，
        //第一个是 labelCol ，是文字部分，第二个部分是输入框
        const formItemLayout = {
            labelCol:{
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol:{
                xs: {span: 24},
                sm: {span: 12}
            }
        };
        //{...formItemLayout}相当于labelCol={formItemLayout,labelCol} wrapperCol={formItemLayout.warpperCol}
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="歌单名称" {...formItemLayout}>
                    {getFieldDecorator('name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入歌单的名称！'
                            }
                        ]
                    })(<Input placeholder="请输入歌单名称"/>)}
                </FormItem>
                <FormItem label="歌单封面" {...formItemLayout}>
                    {getFieldDecorator('cover',{
                        rules:[
                            {
                                required:true,
                                message:'请输入歌单封面的图片地址！'
                            }
                        ]
                    })(<Input placeholder="请输入歌单封面的图片地址"/>)}
                </FormItem>
                <FormItem label="歌单描述" {...formItemLayout}>
                    {getFieldDecorator('desc',{
                        rules:[
                            {
                                required:true,
                                message:'请输入歌单的介绍！'
                            }
                        ]
                    })(<TextArea rows={6} placeholder="请输入歌单介绍"/>)}
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

//将PlayList用Form.create包装
export default Form.create()(PlayList);