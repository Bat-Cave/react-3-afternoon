import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind(this)
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      console.log('Got posts')
      this.setState({posts: res.data})
    })
    .catch(err => {
      console.log(`Failed to get posts. Error code: ${err}`)
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => {
      console.log('Got update posts')
      this.setState({posts: res.data})
    })
    .catch( err => {
      console.log(`Failed to update post. Error code: ${err}`)
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {
      console.log('Deleted post')
      this.setState({posts: res.data})
    })
    .catch(err => {
      console.log(`Failed to delete post. ${err}`)
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text })
    .then(res => {
      console.log('Successfully created post')
      this.setState({posts: res.data})
    })
    .catch(err => {
      console.log(`Failed to create post. ${err}`)
    })
  }

  searchPosts(str){
    if(str.length > 0){
      axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${str}`)
      .then(res => {
        console.log('Filtered posts');
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log(`Failed to filter posts. ${err}`)
      })
    } else {
      axios.get(`https://practiceapi.devmountain.com/api/posts`)
      .then(res => {
        console.log('Cleared filtered posts');
        this.setState({posts: res.data})
      })
      .catch(err => {
        console.log(`Failed to clear filtered posts. ${err}`)
      })
    }
  }

  render() {
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="App__parent">
        <Header searchPostsFn={this.searchPosts}/>

        <section className="App__content">

          <Compose 
            createPostFn={ this.createPost }
          />
          
          {
            posts.map(post => (
              <Post 
                key={post.id} 
                text={post.text} 
                date={post.date} 
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
