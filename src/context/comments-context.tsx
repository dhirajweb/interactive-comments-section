import {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import {
  traverseDeleteComments,
  traverseReplyToComments,
  traverseUpdateComments,
  traverseVoteComments,
} from '../utils/traverseComments';

type CommentsContextProviderProps = {
  children: ReactNode;
};

export type CommentsType = CommentType[];

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: CommentsType | [];
};

export type CurrentUserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type CommentsContextValue = {
  commentsList: CommentsType;
  currentUser: CurrentUserType | null;
  setInitialComments: (comments: CommentsType) => void;
  setCurrentUser: (user: CurrentUserType) => void;
  addComment: (comment: CommentType) => void;
  updateComment: (commentId: number, commentText: string) => void;
  deleteComment: (commentId: number) => void;
  replyToComment: (commentId: number, reply: CommentType) => void;
  upvoteComment: (commentId: number) => void;
  downvoteComment: (commentid: number) => void;
};

type AddCommentAction = {
  type: 'ADD_COMMENT';
  payload: CommentType;
};

type UpdateCommentAction = {
  type: 'UPDATE_COMMENT';
  payload: CommentsType;
};

type DeleteCommentAction = {
  type: 'DELETE_COMMENT';
  payload: CommentsType;
};

type ReplyToCommentAction = {
  type: 'REPLY_TO_COMMENT';
  payload: CommentsType;
};

type UpVoteCommentAction = {
  type: 'UPVOTE_COMMENT';
  payload: CommentsType;
};

type DownVoteCommentAction = {
  type: 'DOWNVOTE_COMMENT';
  payload: CommentsType;
};

type SetInitialCommentsAction = {
  type: 'SET_INITIAL_COMMENTS';
  payload: CommentsType;
};

type CommentAction =
  | AddCommentAction
  | UpdateCommentAction
  | ReplyToCommentAction
  | SetInitialCommentsAction
  | DeleteCommentAction
  | UpVoteCommentAction
  | DownVoteCommentAction;

const initialState: CommentsType = [];

function commentsReducer(state: CommentType[], action: CommentAction) {
  switch (action.type) {
    case 'SET_INITIAL_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'UPDATE_COMMENT':
      return action.payload;
    case 'DELETE_COMMENT':
      return action.payload;
    case 'REPLY_TO_COMMENT':
      return action.payload;
    case 'UPVOTE_COMMENT':
      return action.payload;
    case 'DOWNVOTE_COMMENT':
      return action.payload;
    default:
      return state;
  }
}

const CommentsContext = createContext<CommentsContextValue | null>(null);

export function useCommentsContext() {
  const commentsCtx = useContext(CommentsContext);

  if (commentsCtx === null) {
    throw new Error('CommentsContext is null - that should not be the case!');
  }

  return commentsCtx;
}

const CommentsContextProvider = ({
  children,
}: CommentsContextProviderProps) => {
  const [commentsList, dispatch] = useReducer(commentsReducer, initialState);
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

  const commentsContextValue: CommentsContextValue = {
    commentsList,
    currentUser,
    setInitialComments: (comments) => {
      dispatch({ type: 'SET_INITIAL_COMMENTS', payload: comments });
    },
    setCurrentUser: (user) => {
      setCurrentUser(user);
    },
    addComment: (comment) => {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
    },
    updateComment: (commentId, commentText) => {
      const updatedComments = traverseUpdateComments(
        commentsList,
        commentId,
        commentText
      );

      dispatch({ type: 'UPDATE_COMMENT', payload: updatedComments });
    },
    deleteComment: (commentId) => {
      const updatedComments = traverseDeleteComments(commentsList, commentId);
      dispatch({ type: 'DELETE_COMMENT', payload: updatedComments });
    },
    replyToComment: (commentId, reply) => {
      const updatedComments = traverseReplyToComments(
        commentsList,
        commentId,
        reply
      );
      dispatch({ type: 'REPLY_TO_COMMENT', payload: updatedComments });
    },
    upvoteComment: (commentId) => {
      const updatedComments = traverseVoteComments(
        commentsList,
        commentId,
        'upvote'
      );
      dispatch({ type: 'UPVOTE_COMMENT', payload: updatedComments });
    },
    downvoteComment: (commentId) => {
      const updatedComments = traverseVoteComments(
        commentsList,
        commentId,
        'downvote'
      );
      dispatch({ type: 'DOWNVOTE_COMMENT', payload: updatedComments });
    },
  };

  return (
    <CommentsContext.Provider value={commentsContextValue}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
