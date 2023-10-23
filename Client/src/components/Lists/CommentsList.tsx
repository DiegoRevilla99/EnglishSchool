import { useParams } from "react-router-dom";
import { CommentComponent } from "../others/Comment";

import Comment from "@/models/Comment";
import Auth from "@/models/Auth";

import {
  useCreateCommentMutation,
  useRemoveMyCommentMutation,
} from "@/slices/CommentSlice";

import React from "react";

type Props = {
  comments: Comment[];
  currentUser: Auth | null;
};

export const CommentsList = React.memo(({ comments, currentUser }: Props) => {
  const params = useParams();

  const [createComment, { isLoading: isLoadingCreateComment }] =
    useCreateCommentMutation();
  const [deleteComment, fetchDataRemoveComment] = useRemoveMyCommentMutation();

  return (
    <>
      {comments?.map((comment) => {
        return (
          <CommentComponent
            key={comment.id}
            author={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
            authorId={comment?.user.id}
            comment={comment.content}
            date={comment.createdAt}
            index={0}
            image={"#"}
            replies={comment.count}
            id={comment.id}
            parentId={comment.id}
            postId={params.id!}
            currentUser={currentUser}
            comments={comments}
            createComment={createComment}
            isLoadingCreateComment={isLoadingCreateComment}
            deleteComment={deleteComment}
            fetchDataRemoveComment={fetchDataRemoveComment}
          />
        );
      })}
    </>
  );
});
