import axios from 'axios';
import {useCallback, useState} from 'react';
import './App.css';
import {PostCreate} from './components/PostCreate';
import {PostList} from './components/PostList';

interface Post {
  title: string,
  id: string
}

export interface PostObject {
  [key: string]: Post;
}

const App = () => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const postList = await axios.get('http://localhost:4000/posts');
    setPosts(postList.data);
  }

  const m = useCallback(getPosts, []);
  return (
    <>
     <PostCreate />
     <hr></hr>
     <PostList posts={posts} fetchPosts={m}/>
    </>
  )
}

export default App
