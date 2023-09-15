import axios from "axios";
import {useState, FormEvent} from "react";
import './CommentCreate.css';

export const CommentCreate = ({id}: {id: string}) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${id}/comments`, {content});
  }

  return (
    <form className="comment-create" onSubmit={onSubmit}>
      <label>
        Comment
        <input value={content} onChange={e => setContent(e.target.value)}/>
      </label>
      <button type="submit" title="Submit">Submit</button>
    </form>
  )
}
