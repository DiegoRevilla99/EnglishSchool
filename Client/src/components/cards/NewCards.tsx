import { Link } from "react-router-dom";
import { ModalNewItem } from "../Modals/ModalNewItem";
import { New } from "@/types/NewType";

type Props = {
  news: New[];
};

export const NewCards = ({ news = [] }: Props) => {
  const newsItems = news.map((newItem, index) => {
    return (
      <>
        <div className={`item item-${index + 1}`}>
          <div className="thumb-holder"></div>
          <div className="content-holder">
            <h4 className="news-title">
              <Link
                to={newItem.to}
                data-bs-toggle="modal"
                data-bs-target={`#news-modal-${index + 1}`}
              >
                {newItem.title}
              </Link>
            </h4>
            <div className="intro">{newItem.intro}</div>

            <Link
              className="btn btn-ghost"
              to="#"
              data-bs-toggle="modal"
              data-bs-target={`#news-modal-${index + 1}`}
            >
              Read more<i className="fas fa-angle-right" aria-hidden="true"></i>
            </Link>
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
  return <div className="news-items">{newsItems}</div>;
};
