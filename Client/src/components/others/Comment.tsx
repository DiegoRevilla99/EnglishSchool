import { Avatar, Box, Button, CircularProgress } from "@mui/material";

import { useFormik } from "formik";
import React, { useState } from "react";

import { commentInitial } from "@/interfaces/IComment";
import CommentSchema from "@/validation/schemas/CommentSchema";

import Comment from "@/models/Comment";
import Auth from "@/models/Auth";

import { useGetChildCommentsQuery } from "@/slices/CommentSlice";

import ReplyCommentBox from "./ReplyCommentBox";
import CommentSettings from "./CommentSettings";
import EditCommentBox from "./EditCommentBox";

import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

interface Props {
  id: number;
  index: number;
  author: string;
  authorId: string;
  date: string;
  comment: string;
  image: string;
  replies?: number;
  parentId: number;
  postId: string;
  currentUser: Auth | null;
  comments?: Comment[];
  createComment: MutationTrigger<any>;
  isLoadingCreateComment: boolean;
  deleteComment: MutationTrigger<any>;
  fetchDataRemoveComment: any;
}

export const CommentComponent = React.memo(
  ({
    index = 1,
    author = "Lorem",
    authorId = "",
    date = "00-00-0000",
    comment = "Lorem ipsum",
    replies = 0,
    image = "",
    id = -1,
    parentId = -1,
    postId = "",
    currentUser,
    comments,
    createComment,
    isLoadingCreateComment,
    deleteComment,
    fetchDataRemoveComment,
  }: Props) => {
    const [stateFetchChild, setStateFetchChild] = useState(true);
    const [leaveReply, setLeaveReply] = useState(false);
    const [editState, setEditState] = useState(false);

    const { isLoading } = useGetChildCommentsQuery(id, {
      skip: stateFetchChild,
    });

    const handleToggleReplies = () => {
      setStateFetchChild((state) => !state);
    };

    const handleLeaveReply = () => {
      setLeaveReply(true);
    };

    const handleCancelLeaveReply = () => {
      setLeaveReply(false);
    };

    const formik = useFormik({
      initialValues: commentInitial,
      validationSchema: CommentSchema,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
        const newComment = {
          parentId: parentId,
          userId: currentUser?.id,
          content: values.content,
          postId: postId,
        };

        const inserted = await createComment(newComment).unwrap();
        if (inserted) {
          resetForm();
          setLeaveReply(false);
        }
      },
    });

    const getReplies = () => {
      const parent = comments
        ? comments.find((parent: Comment) => parent.id === parentId)
        : null;
      return parent?.replies || [];
    };

    const stringToDate = (date: string) => {
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
    };

    return (
      <div
        className={`comment-item depth-${index} ${
          index === 1 ? "parent" : "child"
        }`}
      >
        {fetchDataRemoveComment.isLoading &&
        id === fetchDataRemoveComment.originalArgs.commentId ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress color="error" />
          </Box>
        ) : (
          <div className="comment-item-box">
            <div className="comment-author">
              <Avatar sx={{ bgcolor: "#61b3ea" }} variant="square">
                {author.charAt(0)}
              </Avatar>
            </div>

            <div className="comment-body">
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <cite className="name">{author} Dice:</cite>
                  <p className="time">{stringToDate(date)}</p>
                </Box>
                {authorId === currentUser?.id ? (
                  <Box>
                    <CommentSettings
                      commentId={id}
                      userId={currentUser.id}
                      parentId={parentId}
                      setEditState={setEditState}
                      deleteComment={deleteComment}
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>

              <div className="content">
                {editState ? (
                  <EditCommentBox
                    currentUser={currentUser}
                    setEditState={setEditState}
                    originalContent={comment}
                    commentId={id}
                    parentId={parentId}
                    postId={postId}
                  />
                ) : (
                  <p>{comment}</p>
                )}
              </div>

              <Box display="flex" justifyContent="space-between">
                {!editState && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleLeaveReply}
                    sx={{
                      backgroundColor: "#61b3ea",
                      border: `2px solid #61b3ea`,
                      transition:
                        "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
                      "&:hover": {
                        background: "transparent",
                        boxShadow: 0,
                        color: "#61b3ea",
                      },
                    }}
                  >
                    Responder
                  </Button>
                )}

                {replies !== 0 && !editState ? (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleToggleReplies}
                    sx={{
                      backgroundColor: "#2c3d4f",
                      border: `2px solid #2c3d4f`,
                      transition:
                        "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
                      "&:hover": {
                        background: "transparent",
                        boxShadow: 0,
                        color: "#2c3d4f",
                      },
                    }}
                  >
                    {stateFetchChild
                      ? `Ver ${replies} respuesta${replies === 1 ? "" : "s"}`
                      : "Ocultar respuestas"}
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </div>
          </div>
        )}

        {leaveReply && (
          <ReplyCommentBox
            currentUser={currentUser}
            formik={formik}
            handleCancelLeaveReply={handleCancelLeaveReply}
            isLoadingCreateComment={isLoadingCreateComment}
          />
        )}

        {!stateFetchChild && (
          <>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress sx={{ color: "#61b3ea" }} />
              </Box>
            ) : (
              <div className="children">
                {getReplies().map((child: Comment) => {
                  return (
                    <CommentComponent
                      key={child.id}
                      index={1}
                      author={`${child?.user?.firstName} ${child?.user?.lastName}`}
                      authorId={child?.user?.id}
                      comment={child.content}
                      date={child.createdAt}
                      image={"#"}
                      id={child.id}
                      parentId={parentId}
                      postId={postId}
                      currentUser={currentUser}
                      createComment={createComment}
                      isLoadingCreateComment={isLoadingCreateComment}
                      deleteComment={deleteComment}
                      fetchDataRemoveComment={fetchDataRemoveComment}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
