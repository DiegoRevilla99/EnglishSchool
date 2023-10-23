import Tag from "@/models/Tag";
import { Link } from "react-router-dom";

type Props = {
  tag: Tag;
};

export const TagLink = ({ tag }: Props) => {
  return <Link to={"#"}>{tag.name}</Link>;
};
