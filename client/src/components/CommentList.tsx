interface Comment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected'
}

export const CommentList = ({comments}: {comments: Comment[]}) => {
  return comments && comments.length > 0 && (
    <div>
      {comments.length} comments
      <ul>
        {comments.map((comment) => (
          <>
            {comment.status === 'pending' && <li key={comment.id}>Comment awaiting moderation</li>}
            {comment.status === 'rejected' && <li key={comment.id}>Comment Rejected</li>}
            {comment.status === 'approved' && <li key={comment.id}>{comment.content}</li>}
          </>
        ))}
      </ul>
    </div>
  )
}
