import { FC, useEffect } from 'react';
import { CommentType } from '../context/comments-context';
import CommentsList from './CommentsList';
import styles from '../styles/Comment.module.css';

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  useEffect(() => {
    console.log(comment);
  }, []);

  return (
    <>
      {' '}
      <li className={styles.single_comment}>
        <div className={styles.comment_score}>
          <button>+</button>
          <p>{comment.score}</p>
          <button>-</button>
        </div>
        <div className={styles.comment_info}>
          <header>
            <div className={styles.comment_details}>
              <img src={comment.user.image.webp} alt="user image" />
              <span>{comment.user.username}</span>
              <span>{comment.createdAt}</span>
            </div>
            <button>
              {' '}
              <img src="/images/icon-reply.svg" alt="reply button" />
              Reply
            </button>
          </header>
          <div className={styles.comment_text}>
            <p>{comment.content}</p>
          </div>
        </div>
      </li>
      {comment.replies?.length > 0 && (
        <div className={styles.replies}>
          <div className={styles.reply}>
            <CommentsList commentsList={comment.replies} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
