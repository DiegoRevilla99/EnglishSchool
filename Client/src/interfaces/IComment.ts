import Comment from "@/models/Comment";
import Student from "@/models/Student";
import User from "@/models/User";

export interface IComment {
  id?: number;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  parentComment?: number;
  userId?: string;
  postId?: string;
}

export const commentInitial: IComment = {
  id: -1,
  content: "",
  parentComment: -1,
  userId: "",
};

export const commentFilled = (comment: Comment) => {
  const commentFormik = { ...comment };
  return commentFormik;
};
