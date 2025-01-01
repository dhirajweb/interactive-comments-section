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

    const handleChangeCommentText = (event: ChangeEvent<HTMLInputElement>) => {
      setCommentText(event.target.value);
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        inputFocus() {
          console.log('focusing...');
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
      <form onSubmit={handleSubmit}>
        <img src={currentUser?.image.webp} alt="user image" />
        <input
          type="text"
          ref={inputRef}
          value={commentText}
          onChange={(e) => handleChangeCommentText(e)}
          placeholder="Add a comment..."
        />
        <Button type="submit">{actionBtnText}</Button>
      </form>
    );
  }
);

export default WriteComment;
