import { Link, useNavigate } from "react-router-dom";

import Post from "@/models/Post";
import { Button } from "@mui/material";
import { useAppDispatch } from "@/hooks/useRedux";
import { selectPost } from "@/reducers/PostReducer";

type Props = {
  posts: Post[];
};

export const BlogList = ({ posts = [] }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const stringToDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const getFirstParagraph = (post: Post): string => {
    if (post) {
      const paragraphs = post?.body?.match(/<p>(.*?)<\/p>/);
      return paragraphs ? paragraphs[1] : post.title;
    }
    return "...";
  };

  const handleSelectPost = (post: Post) => {
    dispatch(selectPost(post.id));
  };

  return (
    <>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <div className="post-thumb">
            <Link
              onClick={() => handleSelectPost(post)}
              className="thumb-link"
              to={`/blog/post/${post.id}`}
            >
              <img
                className="img-fluid"
                style={{ width: "100%" }}
                src={post.mainImage}
                alt=""
              />
            </Link>
          </div>

          <div className="content">
            <h3 className="post-title">
              <Link
                onClick={() => handleSelectPost(post)}
                to={`/blog/post/${post.id}`}
              >
                {post.title}
              </Link>
            </h3>
            <div className="date">{stringToDate(post.createdAt)}</div>

            <div className="post-entry">
              <p>{getFirstParagraph(post)}</p>
              <Button
                variant="contained"
                onClick={() => {
                  handleSelectPost(post);
                  navigate(`/blog/post/${post.id}`);
                }}
                sx={{
                  backgroundColor: "#61b3ea",
                  border: "2px solid #61b3ea",
                  transition:
                    "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
                  "&:hover": {
                    background: "transparent",
                    boxShadow: 0,
                    color: "#61b3ea",
                  },
                }}
              >
                Leer más
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
