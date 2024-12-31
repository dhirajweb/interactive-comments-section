import { FC } from 'react';
import Comment from './Comment';
import { CommentsType } from '../context/comments-context';

type CommentsListProps = {
  commentsList: CommentsType;
};

const CommentsList: FC<CommentsListProps> = ({ commentsList }) => {
  return (
    <ul>
      {commentsList.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentsList;
