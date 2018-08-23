export const play = (src, musicTitle, playLists) => ({
    type: 'PLAY',
    src,
    musicTitle,
    playLists
});
//参数：src
//因为只有一行代码，使用()表示return语句
//src => ({ type: 'PLAY'})相当于(src)=>(return{type:'PLAY'}),ES6的高级用法
//方法体中的src相当于src:src,因为两个值相同可以用src来标明

export const switchPlay = (src, musicTitle) => ({
    type : 'SWITCH',
    src,
    musicTitle
});