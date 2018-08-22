const player = (state = {},action) => {
    switch(action.type){
        case 'PLAY':
        return{
            ...state,
            src:action.src
        };
        default:
        return state;
    }

};
export default player;
//参数state = {},action,state是对象,{}表示json对象
//这个文件接收的值都是来源于 action 下面的 index.js 文件，并且把值返回到 state 中去。