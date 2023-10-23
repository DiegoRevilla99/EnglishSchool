import Tag from "@/models/Tag";
import { TagLink } from "./TagLink";

type Props = {
  tags: Tag[] | number[];
};

export const TagsBlock = ({ tags = [] }: Props) => {
  return (
    <div className="tags-block block">
      <h3 className="block-title">Tags</h3>
      <div className="blog-tags">
        {tags.map((tag, index) => (
          <TagLink key={index} tag={tag} />
        ))}
      </div>
    </div>
  );
};
