import './PostList.css';
import {useEffect, useState} from 'react';
import {CommentCreate} from './CommentCreate';
import {CommentList} from './CommentList';
import axios from 'axios';

interface Post {
  comments: [],
  title: string,
  id: string
}

export interface PostObject {
  [key: string]: Post;
}

const Post = ({post}: {post: Post}) => (
  <div className='post'>
    {post.title}
    <CommentList comments={post.comments} />
    <CommentCreate id={post.id} />
  </div>
)

export const PostList = () => {
  const [posts, setPosts] = useState<PostObject>({});

  useEffect(() => {
    const getPosts = async () => {
      const list = await axios.get('http://posts-udemy.com/posts');
      setPosts(list.data);
    }
    
    getPosts();
  }, []);

  return (
    <section className='post-section'>
      <h1>Posts</h1>
      <div className='post-list'>
        {Object.keys(posts).map((post) => <Post key={post} post={posts[post]} />)}
      </div>
    </section>
  )
}
