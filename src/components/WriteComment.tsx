import { useState, type ChangeEvent } from 'react';
import { useCommentsContext } from '../context/comments-context';

const WriteComment = () => {
  const { currentUser } = useCommentsContext();
  const [commentText, setCommentText] = useState<string>('');

  const handleChangeCommentText = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  return (
    <form>
      <img src={currentUser?.image.webp} alt="user image" />
      <input
        type="text"
        value={commentText}
        onChange={(e) => handleChangeCommentText(e)}
      />
    </form>
  );
};

export default WriteComment;
