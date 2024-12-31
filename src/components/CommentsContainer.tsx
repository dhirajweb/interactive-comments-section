import { FC, useEffect } from 'react';
import { useCommentsContext } from '../context/comments-context';
import CommentsList from './CommentsList';
import WriteComment from './WriteComment';

const CommentsContainer: FC = () => {
  const { commentsList, setInitialComments, setCurrentUser } =
    useCommentsContext();

  async function getComments() {
    const response = await fetch('http://localhost:4000/comments');
    const data = await response.json();
    setInitialComments(data);
  }

  async function getCurrentUser() {
    const response = await fetch('http://localhost:4000/currentUser');
    const data = await response.json();
    setCurrentUser(data);
  }

  useEffect(() => {
    getComments();
    getCurrentUser();
  }, []);

  return (
    <div className="container">
      <CommentsList commentsList={commentsList} />
      <WriteComment />
    </div>
  );
};

export default CommentsContainer;
