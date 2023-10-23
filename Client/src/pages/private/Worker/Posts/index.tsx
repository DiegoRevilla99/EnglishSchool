import ImageBanner from "@/assets/images/hero/posts.png";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { idleState, selectPost } from "@/reducers/PostReducer";

import {
  useDeletePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} from "@/slices/PostSlice";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { items: posts, state } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();

  const [removePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const { isLoading: fetchLoading } = useGetAllPostsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllPostsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createPost() {
    navigate("/posts/crear");
  }

  function editPost(event: React.MouseEvent<Element, MouseEvent>) {
    const postId = event.currentTarget.id.split("#").pop() || "";
    dispatch(selectPost(postId));
    navigate("/posts/editar");
  }

  async function deletePost(event: React.MouseEvent<Element, MouseEvent>) {
    const postId = event.currentTarget.id.split("#").pop() || "";
    await removePost(postId);
  }

  useEffect(() => {
    dispatch(idleState({}));
    triggerRefresh({});
  }, []);

  return (
    <div>
      <HeroBanner
        title="Posts"
        image={ImageBanner}
        imagePosition="center 35%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={posts}
          title={"Posts"}
          refreshFn={refresh}
          createFn={createPost}
          headers={getHeaders("Posts", false)}
          editFn={(value) => editPost(value)}
          deleteFn={(value) => deletePost(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>
      {/* <CreatePost /> */}
      {/* <EditPost /> */}
    </div>
  );
};

export default Posts;
