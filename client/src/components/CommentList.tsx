interface Comment {
  id: string;
  content: string;
}

export const CommentList = ({comments}: {comments: Comment[]}) => {
  return comments.length > 0 && (
    <div>
      {comments.length} comments
      <ul>
        {comments.map((comment) => (<li key={comment.id}>{comment.content}</li>))}
      </ul>
    </div>
  )
  
}
