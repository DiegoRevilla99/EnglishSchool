import { Link } from "react-router-dom";
import { ModalNewItem } from "../Modals/ModalNewItem";
import { New } from "@/types/NewType";

type Props = {
  news: New[];
};

export const NewsList = ({ news = [] }: Props) => {
  const newsItems = news.map((newItem, index) => {
    return (
      <>
        <div className="item col-12 col-md-4">
          <div className="item-inner">
            <div className="thumb-holder">
              <img className="img-fluid" src={newItem.image} alt="" />
            </div>

            <div className="content-holder">
              <h4 className="news-title">
                <Link to="#">{newItem.title}</Link>
              </h4>
              <div className="intro">{newItem.intro}</div>
            </div>

            <Link
              className="link"
              to="#"
              data-bs-toggle="modal"
              data-bs-target={`#news-modal-${index + 1}`}
            ></Link>
          </div>
        </div>

        <ModalNewItem
          date={newItem.date}
          image={newItem.image}
          index={index}
          paragraphs={newItem.paragraphs}
          title={newItem.title}
        />
      </>
    );
  });
  return <>{newsItems}</>;
};
