import { CommentsType, CommentType } from '../context/comments-context';

export const traverseUpdateComments = (
  comments: CommentsType,
  commentId: number,
  commentText: string
): CommentsType => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      // Update the comment if it matches the ID
      return { ...comment, content: commentText };
    } else if (comment.replies && comment.replies.length > 0) {
      // Recursively update replies and ensure the result is assigned back to replies
      return {
        ...comment,
        replies: traverseUpdateComments(
          comment.replies,
          commentId,
          commentText
        ),
      };
    }
    return comment; // Return the original comment if no changes are needed
  });
};

export const traverseVoteComments = (
  comments: CommentsType,
  commentId: number,
  type: 'upvote' | 'downvote'
): CommentsType => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      // Update the comment if it matches the ID
      return {
        ...comment,
        score: type === 'upvote' ? comment.score + 1 : comment.score - 1,
      };
    } else if (comment.replies && comment.replies.length > 0) {
      // Recursively update replies and ensure the result is assigned back to replies
      return {
        ...comment,
        replies: traverseVoteComments(comment.replies, commentId, type),
      };
    }
    return comment; // Return the original comment if no changes are needed
  });
};

export const traverseReplyToComments = (
  comments: CommentsType,
  commentId: number,
  reply: CommentType
): CommentsType => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      // Update the comment if it matches the ID
      return { ...comment, replies: [...(comment.replies || []), reply] };
    } else if (comment.replies && comment.replies.length > 0) {
      // Recursively update replies and ensure the result is assigned back to replies
      return {
        ...comment,
        replies: traverseReplyToComments(comment.replies, commentId, reply),
      };
    }
    return comment; // Return the original comment if no changes are needed
  });
};

export const traverseDeleteComments = (
  comments: CommentsType,
  commentId: number
): CommentsType => {
  return comments
    .filter((comment) => comment.id !== commentId) // Filter out the comment with the given ID
    .map((comment) => {
      // If the comment has replies, recursively process them
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: traverseDeleteComments(comment.replies, commentId),
        };
      }
      return comment; // Return the comment if it doesn't require changes
    });
};
