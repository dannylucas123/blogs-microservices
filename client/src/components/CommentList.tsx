import axios from "axios";
import {useEffect, useState} from "react"

interface Comment {
  id: string;
  content: string;
}

export const CommentList = ({id}: {id:string}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const c = await axios.get(`http://localhost:4001/posts/${id}/comments`);

    setComments(c.data || []);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return comments.length > 0 && (
    <div>
      {comments.length} comments
      <ul>
        {comments.map((comment) => (<li key={comment.id}>{comment.content}</li>))}
      </ul>
    </div>
  )
  
}
