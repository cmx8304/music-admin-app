import React, { Component } from 'react';
class Songs extends Component {
    componentWillMount() {
        document.title = "歌曲管理"
    }
    render() {
        return (
            <div>Songs</div>
        );
    }
}

export default Songs;