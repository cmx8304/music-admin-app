import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
//得到reducers的index文件
import stores from './reducers';

//将reducer创建成一个stores对象
const store = createStore(stores);

ReactDOM.render(
    //使得<Provider>标签下面的Components都能访问到store instance
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
//支持redux的store组件