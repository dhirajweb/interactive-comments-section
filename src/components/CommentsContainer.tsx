import { FC, useEffect } from 'react';
import { useCommentsContext } from '../context/comments-context';
import CommentsList from './CommentsList';
import WriteComment from './WriteComment';
import styles from '../styles/CommentsContainer.module.css';

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
    <div className={`container ${styles.comments_container}`}>
      <CommentsList commentsList={commentsList} />
      <WriteComment actionBtnText="Send" actionType="send" />
    </div>
  );
};

export default CommentsContainer;
