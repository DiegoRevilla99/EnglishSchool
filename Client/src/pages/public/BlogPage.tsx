import { Breadcrumb } from "../../components/Template/Header/Breadcrumb";
import { BreadcrumbItem } from "../../components/Template/Header/BreadcrumbItem";
import { Link, useParams } from "react-router-dom";

import HeroBanner from "@/components/Template/Header/HeroBanner";
import Banner from "@/assets/images/hero/hero-blog.jpg";

import { BlogList } from "@/components/others/BlogList";
import { TagsBlock } from "@/components/others/TagBlock";
import { Pagination } from "@/components/others/Pagination";
import {
  useFindPostsByPageQuery,
  useLazyFindPostsByPageQuery,
} from "@/slices/PostSlice";

import { useGetAllTagsQuery } from "@/slices/TagsSlice";

import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const BlogPage = () => {
  const { page } = useParams();
  const pageNumber = parseInt(page || "1");

  const { data: totalPosts, isLoading: fetchLoadingPosts } =
    useFindPostsByPageQuery(pageNumber);
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyFindPostsByPageQuery();
  const { data: allTags } = useGetAllTagsQuery({});

  useEffect(() => {
    triggerRefresh(pageNumber);
  }, [pageNumber]);

  const { items: posts, state } = useAppSelector((state) => state.posts);
  return (
    <div className="blog-page">
      <HeroBanner title="Blog" image={Banner} imagePosition="" />

      <Breadcrumb>
        <BreadcrumbItem>
          <i className="fas fa-home" aria-hidden="true"></i>
          <Link to="/">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>Blog</BreadcrumbItem>
      </Breadcrumb>

      <div className="main-cols-wrapper">
        <div className="container">
          <div className="row">
            <section className="col-main blog-list-section col-12 col-lg-8">
              {fetchLoadingPosts ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress sx={{ color: "#61b3ea" }} />
                </Box>
              ) : (
                <BlogList posts={posts} />
              )}

              <Pagination
                totalPages={Math.ceil((totalPosts ? totalPosts[1] : 1) / 5)}
                currentPage={pageNumber}
              />
            </section>

            <aside className="col-side blog-side col-12 col-lg-4">
              <div className="col-side-inner">
                {/* <FeaturedPostsBlock posts={featuredPosts} /> */}

                <TagsBlock tags={allTags} />

                {/* <ArchiveBlock archives={archives} /> */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
