import { FC } from 'react';
import Comment from './Comment';
import { CommentsType } from '../context/comments-context';
import styles from '../styles/CommentsList.module.css';
import CommentShimmer from './common/CommentShimmer';

type CommentsListProps = {
  commentsList: CommentsType;
};

const CommentsList: FC<CommentsListProps> = ({ commentsList }) => {
  if (commentsList.length === 0) {
    return (
      <ul className={styles.comment_list_shimmer}>
        {[...Array(5)].map((_, i) => {
          return <CommentShimmer key={i} />;
        })}
      </ul>
    );
  }

  return (
    <ul className={styles.comment_list}>
      {commentsList.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentsList;
