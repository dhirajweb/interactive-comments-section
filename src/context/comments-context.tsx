import {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

type CommentsContextProviderProps = {
  children: ReactNode;
};

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: CommentType[] | [];
};

export type CommentsType = CommentType[];

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
  updateComment: (commentId: number, comment: string) => void;
  replyToComment: (commentId: number, reply: string) => void;
};

type AddCommentAction = {
  type: 'ADD_COMMENT';
  payload: CommentType;
};

type UpdateCommentAction = {
  type: 'UPDATE_COMMENT';
  payload: {
    commentId: number;
    comment: string;
  };
};

type ReplyToCommentAction = {
  type: 'REPLY_TO_COMMENT';
  payload: {
    commentId: number;
    reply: string;
  };
};

type SetInitialCommentsAction = {
  type: 'SET_INITIAL_COMMENTS';
  payload: CommentsType;
};

type CommentAction =
  | AddCommentAction
  | UpdateCommentAction
  | ReplyToCommentAction
  | SetInitialCommentsAction;

// type CommentsState = {
//   commentsList: CommentsType;
// };

const initialState: CommentsType = [];

function commentsReducer(state: CommentType[], action: CommentAction) {
  switch (action.type) {
    case 'SET_INITIAL_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.payload];
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
      console.log('Adding comment:', comment);
    },
    updateComment: () => {},
    replyToComment: () => {},
  };

  return (
    <CommentsContext.Provider value={commentsContextValue}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
