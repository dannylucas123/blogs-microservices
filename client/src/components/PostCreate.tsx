import {FormEvent, useState} from 'react';
import axios from 'axios';
import './PostCreate.css';

export const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {title});
  }

  return (
    <form className="post-create" onSubmit={onSubmit}>
      <h1>Create Post</h1>
      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)}/>
      </label>
      <button type="submit" title="Submit">Submit</button>
    </form>
  )
}
