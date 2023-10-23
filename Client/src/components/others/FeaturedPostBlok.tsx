import { FeaturedPostItem } from "./FeaturedPostItem";
import { FeaturedPost } from "@/types/FeaturedPostType";

type Props = {
  posts: FeaturedPost[];
};

export const FeaturedPostsBlock = ({ posts = [] }: Props) => {
  return (
    <div className="posts-block block">
      <h3 className="block-title">Post Destacados</h3>
      {posts.map((post) => (
        <FeaturedPostItem
          key={post.id}
          title={post.title}
          date={post.date}
          imageSrc={post.imageSrc}
          imageAlt={post.imageAlt}
        />
      ))}
    </div>
  );
};
