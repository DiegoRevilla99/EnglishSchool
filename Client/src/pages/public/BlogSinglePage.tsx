import "@/assets/css/carouselBlogGallery.css";
import { Box, CircularProgress } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Breadcrumb } from "@/components/Template/Header/Breadcrumb";
import { BreadcrumbItem } from "@/components/Template/Header/BreadcrumbItem";
import { CommentsList } from "@/components/Lists/CommentsList";
import { TagsBlock } from "@/components/others/TagBlock";
import GalleryCarousel from "@/components/Carousels/GalleryCarousel";
import HeroBanner from "@/components/Template/Header/HeroBanner";

import Banner from "@/assets/images/hero/hero-blog-post.jpg";

import { useAppSelector } from "@/hooks/useRedux";

import { useGetCommentsByPostQuery } from "@/slices/CommentSlice";
import { useLazyGetOnePostQuery } from "@/slices/PostSlice";

import Comment from "@/models/Comment";
import { CreateCommentBox } from "@/components/others/CreateCommentBox";

const BlogSinglePage = () => {
  const params = useParams();

  const post = useAppSelector((state) => state.posts.itemSelected);
  const currentUser = useAppSelector((state) => state.auth.user);
  const comments = useAppSelector((state) => state.comments.items);

  const { isLoading } = useGetCommentsByPostQuery(params.id!);
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetOnePostQuery({});

  useEffect(() => {
    if (post.id === "") {
      triggerRefresh(params.id!);
    }
  }, []);

  const stringToDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const renderHTML = (): { __html: string } => {
    const bodyWithoutSpaces = post?.body?.replace(/<br>/g, "");
    return { __html: bodyWithoutSpaces };
  };

  const countComments = (): string => {
    const totalComments = comments.reduce((acc: number, comment: Comment) => {
      return acc + (comment.count + 1);
    }, 0);

    return totalComments === 1
      ? totalComments + " Comentario"
      : totalComments + " Comentarios";
  };

  const finalBody = renderHTML();

  return (
    <div className="blog-single-page">
      <HeroBanner title={post.title} image={Banner} imagePosition="" />

      <Breadcrumb>
        <BreadcrumbItem>
          <i className="fas fa-home" aria-hidden="true"></i>{" "}
          <Link to="/index">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <i className="fas fa-home" aria-hidden="true"></i>{" "}
          <Link to="/blog/page/1">Blog</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>{post.title}</BreadcrumbItem>
      </Breadcrumb>
      <div className="main-cols-wrapper">
        <div className="container">
          <div className="row gx-5">
            {refetchLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#61b3ea" }} />
              </Box>
            ) : (
              <section className="col-main blog-post col-12 col-md-9 col-lg-8">
                <div className="post-single">
                  <h3 className="post-single-title">{post.title}</h3>
                  <div className="meta">
                    {stringToDate(post.createdAt)} / Posteado por{" "}
                    <Link to="#">Mundo Lingua</Link>
                  </div>
                  <div className="content">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                    >
                      <img
                        src={post.mainImage}
                        className="figure-img"
                        alt="Image"
                        style={{
                          margin: "0 auto",
                          maxHeight: "100%",
                          maxWidth: "100%",
                        }}
                      />
                    </Box>

                    <div dangerouslySetInnerHTML={finalBody} />

                    <GalleryCarousel gallery={post.gallery} />
                  </div>
                  <nav className="post-nav">
                    <span className="nav-previous">
                      <a href="#" rel="prev">
                        <i className="fas fa-long-arrow-alt-left"></i>Anterior
                      </a>
                    </span>
                    <span className="nav-next">
                      <a href="#" rel="next">
                        Siguiente<i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </span>
                  </nav>

                  <div id="comment-area" className="comment-area">
                    <div className="comment-container">
                      <div className="comment-list">
                        <h3 className="title">{countComments()} </h3>
                        <CommentsList
                          comments={comments ? comments : []}
                          currentUser={currentUser}
                        />
                      </div>
                    </div>

                    <CreateCommentBox
                      postId={params.id!}
                      currentUser={currentUser}
                    />
                  </div>
                </div>
              </section>
            )}

            <aside className="col-side blog-side col-12 col-md-3 col-lg-4">
              <div className="col-side-inner">
                {/* <FileCard
                  image="/src/assets/images/sidebar/file-thumb-1.jpg"
                  title="Prospectos escolares 2025"
                /> */}

                {/* <FeaturedPostsBlock posts={featuredPosts} /> */}

                <TagsBlock tags={post.tags} />

                {/* <ArchiveBlock archives={archives} /> */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSinglePage;
