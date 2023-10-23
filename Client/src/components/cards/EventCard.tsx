type Props = {
  day: string;
  month: string;
  title: string;
  description: string;
};

export const EventCard = ({
  day = "01",
  month = "JAN",
  title = "Lorem Ipsum",
  description = "Lorem Ipsum",
}: Props) => {
  return (
    <div className="item">
      <div className="time">
        <div className="time-inner">
          <div className="date">{day}</div>
          <div className="month">{month}</div>
        </div>
      </div>

      <div className="details">
        <h4 className="event-title">{title}</h4>
        <div className="intro">{description}</div>
      </div>
    </div>
  );
};
