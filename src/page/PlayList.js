import React, { Component } from 'react';

/**
 * 歌单管理
 */
class PlayList extends Component {
    componentWillMount() {
        document.title = "歌单管理";
    }

    render() {
        return (
          <div>PlayList</div>  
        );
    }
}

export default PlayList;