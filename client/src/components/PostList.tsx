import './PostList.css';
import {PostObject} from '../App';
import {useEffect} from 'react';
import {CommentCreate} from './CommentCreate';
import {CommentList} from './CommentList';

const Post = ({title, id}: {title: string, id: string}) => (
  <div className='post'>
    {title}
    <CommentList id={id} />
    <CommentCreate id={id} />
  </div>
)

type PostListProps = {
  posts: PostObject,
  fetchPosts: () => void
}

export const PostList = ({posts, fetchPosts}: PostListProps) => {
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);

  return (
    <section className='post-section'>
      <h1>Posts</h1>
      <div  className='post-list'>
        {Object.keys(posts).map((post) => <Post key={post} id={post} title={posts[post].title}/>)}
      </div>
    </section>
  )
}
