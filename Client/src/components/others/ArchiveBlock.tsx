import { Link } from "react-router-dom";

type Props = {
  archives: Archive[];
};

export const ArchiveBlock = ({ archives = [] }: Props) => {
  return (
    <div className="archive-block block">
      <h3 className="block-title">Archivo</h3>
      {archives.map((archive) => (
        <dl key={archive.year}>
          <dt className="blog-year">{archive.year}</dt>
          {archive.months.map((month) => (
            <dd className="blog-month" key={month.name}>
              <Link to={month.to}>
                {month.name} ({month.quantity})
              </Link>
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
};
