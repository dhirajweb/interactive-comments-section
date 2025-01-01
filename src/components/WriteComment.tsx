import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { useCommentsContext } from '../context/comments-context';
import Button from './common/Button';
import styles from '../styles/WriteComment.module.css';

type SendProps = {
  actionType: 'send';
  actionBtnText: string;
};
type ReplyProps = {
  actionType: 'reply';
  actionBtnText: string;
  commentId: number;
  replyingTo: string;
  closeReplyBox: () => void;
};

type WriteCommentProps = SendProps | ReplyProps;

export type WriteCommentHandle = {
  inputFocus: () => void;
};

const WriteComment = forwardRef<WriteCommentHandle, WriteCommentProps>(
  ({ actionType, actionBtnText, ...props }, ref) => {
    const { currentUser, addComment, replyToComment } = useCommentsContext();
    const [commentText, setCommentText] = useState<string>(
      actionType === 'reply' ? `@${(props as ReplyProps).replyingTo} ` : ''
    );

    const handleChangeCommentText = (
      event: ChangeEvent<HTMLTextAreaElement>
    ) => {
      setCommentText(event.target.value);
    };

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        inputFocus() {
          inputRef.current?.focus();
        },
      }),
      []
    );

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (actionType === 'send') {
        addComment({
          user: currentUser!,
          createdAt: new Date().getTime().toString(),
          id: new Date().getTime(),
          content: commentText,
          score: 0,
          replies: [],
        });
      } else if (actionType === 'reply') {
        replyToComment((props as ReplyProps).commentId, {
          user: currentUser!,
          createdAt: new Date().getTime().toString(),
          id: new Date().getTime(),
          content: commentText,
          score: 0,
          replyingTo: (props as ReplyProps).replyingTo,
          replies: [],
        });
        (props as ReplyProps).closeReplyBox();
      }

      setCommentText('');
    };

    return (
      <form className={styles.write_comment_container} onSubmit={handleSubmit}>
        <img
          className={styles.profile_img}
          src={currentUser?.image.webp}
          alt="user image"
        />
        <div className={styles.input_container}>
          <textarea
            cols={12}
            rows={3}
            ref={inputRef}
            value={commentText}
            onChange={(e) => handleChangeCommentText(e)}
            placeholder="Add a comment..."
          />
        </div>

        <Button type="submit">{actionBtnText}</Button>
      </form>
    );
  }
);

export default WriteComment;
