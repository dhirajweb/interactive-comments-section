import { FC } from 'react';
import Comment from './Comment';
import { CommentsType } from '../context/comments-context';
import styles from '../styles/CommentsList.module.css';

type CommentsListProps = {
  commentsList: CommentsType;
};

const CommentsList: FC<CommentsListProps> = ({ commentsList }) => {
  return (
    <ul className={styles.comment_list}>
      {commentsList.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentsList;
