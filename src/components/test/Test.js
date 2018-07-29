import React, {Component} from 'react';

class Test extends Component {
    state = {
        title: '',
        body:''
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.setState({
                title: data.title,
                body: data.body
            }))
    }

    // Depricated
/*    componentWillMount(){
        console.log('Component will mount...');
    }*/

    componentDidUpdate(){
        console.log('component did update...');
    }

    // Depricated
 /*   componentWillUpdate(){
        console.log('component Will update...');
    }

    // Depricated
    componentWillReceiveProps(nextProps, nextState){
        console.log('component Will receive props...');
    }*/

    // New methods
    static getDerivedStateFromProps(nextProps, prevState){
        return null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        return null;
    }


    render() {
        const {title, body}  = this.state;
        return (
            <div>
                <h1> {title}</h1>
                <p> {body}</p>
            </div>
        );
    }
}

export default Test;