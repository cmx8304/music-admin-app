const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

//require 语句，是 node.js 提供的 import 方式
const app = express();
//用于解析 form 提交的内容，并且把 body 内容转换为 json 格式
app.use(bodyParser.json());

//缓存歌单数据
const playlistDatas = [
    {
        id:1,
        name:'测试歌单1',
        cover:'http://xx.com/xx.jpg',
        desc:'测试歌单描述'
    }
];
/**
 * 处理歌单添加
 */
app.post('/api/playlist/add',function(req,res){
    req.body.id = uuidv4();
    playlistDatas.push(req.body);

    console.log('add playlist:' ,req.body);
    res.json(req.body);
});

/**
 * 处理歌单列表数据
 */
app.get('/api/playlist/query',function(req,res){
    res.json(playlistDatas);
});

app.listen(4000,function(){
    console.log('Example app listening on port 4000!');
});