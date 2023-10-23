type Props = {
  image: string;
  title: string;
};

export const FileCard = ({ image = "", title = "Lorem Ipsum" }: Props) => {
  return (
    <div className="file-block block">
      <div className="file-thumb-holder">
        <img className="file-thumb img-fluid" src={image} alt="" />
        <a className="download-link" href="#">
          <img
            className="download-icon"
            src="/src/assets/images/download-icon.svg"
            alt=""
          />
        </a>
        <div className="mask"></div>
      </div>

      <div className="file-intro">
        <h4 className="file-title">
          <a href="#">{title}</a>
        </h4>
      </div>
    </div>
  );
};
