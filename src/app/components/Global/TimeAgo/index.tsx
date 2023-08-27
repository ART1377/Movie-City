import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');

type Props = {
  date: Date | string;
};

const Time = ({ date }: Props) => {
  return <TimeAgo datetime={date} locale="en" />;
};

export default Time;
