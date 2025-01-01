import { ChangeEvent, useEffect, useRef, useState, type FC } from 'react';
import { CommentType, useCommentsContext } from '../context/comments-context';
import CommentsList from './CommentsList';
import styles from '../styles/Comment.module.css';
import Button from './common/Button';
import WriteComment, { WriteCommentHandle } from './WriteComment';

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  const {
    currentUser,
    updateComment,
    deleteComment,
    upvoteComment,
    downvoteComment,
  } = useCommentsContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(comment.content);
  const [isReplying, setIsReplying] = useState(false);

  const commentContainerRef = useRef<WriteCommentHandle>(null);

  const handleChangeEditText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleUpdateText = () => {
    updateComment(comment.id, editText);
    setIsEdit(false);
  };

  const handleCloseReplyBox = () => {
    setIsReplying(false);
  };

  const handleOnReply = () => {
    setIsReplying(true);
  };

  useEffect(() => {
    if (isReplying) commentContainerRef.current?.inputFocus();
  }, [isReplying]);

  return (
    <>
      {' '}
      <li className={styles.single_comment}>
        <div className={styles.comment_score}>
          <button onClick={() => upvoteComment(comment.id)}>
            <img src="/images/icon-plus.svg" alt="upvote icon" />
          </button>
          <p>{comment.score}</p>
          <button onClick={() => downvoteComment(comment.id)}>
            <img src="/images/icon-minus.svg" alt="downvote icon" />
          </button>
        </div>
        <div className={styles.comment_info}>
          <header>
            <div className={styles.comment_details}>
              <img
                className={styles.profile_img}
                src={comment.user.image.webp}
                alt="user image"
              />
              <span className={styles.username}>{comment.user.username}</span>
              <span className={styles.createdAt}>{comment.createdAt}</span>
            </div>
            {currentUser?.username !== comment.user.username && (
              <button className={styles.reply_btn} onClick={handleOnReply}>
                {' '}
                <img src="/images/icon-reply.svg" alt="reply button" />
                Reply
              </button>
            )}

            {currentUser?.username === comment.user.username && (
              <div className={styles.comment_actions_container}>
                <div>
                  <img src="/images/icon-delete.svg" alt="delete icon" />
                  <button
                    disabled={isEdit}
                    onClick={() => deleteComment(comment.id)}
                    className={styles.delete_btn}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <img src="/images/icon-edit.svg" alt="edit icon" />
                  <button
                    className={styles.edit_btn}
                    onClick={() => setIsEdit(true)}
                    disabled={isEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </header>
          <div className={styles.comment_text}>
            {isEdit ? (
              <textarea
                rows={3}
                value={editText}
                onChange={handleChangeEditText}
              />
            ) : (
              <p>{comment.content}</p>
            )}
            {isEdit && <Button onClick={handleUpdateText}>Update</Button>}
          </div>
        </div>
      </li>
      {isReplying && (
        <WriteComment
          ref={commentContainerRef}
          actionBtnText="Reply"
          actionType="reply"
          commentId={comment.id}
          closeReplyBox={handleCloseReplyBox}
          replyingTo={comment.user.username}
        />
      )}
      {comment?.replies?.length > 0 && (
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
