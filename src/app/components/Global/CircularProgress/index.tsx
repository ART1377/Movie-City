import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  percentage: number;
};

const CircularProgress = ({ percentage }: Props) => {
  const rateStyle =
    percentage >= 8.5
      ? "#01995f"
      : percentage >= 7
      ? "#47d796"
      : percentage >= 5
      ? "#fbbf24"
      : "#ff1d48";
  //rgba(1, 153, 95, 1) dark
  //rgba(71, 215, 150, 1) main
  return (
    // <div className="w-12 h-12 rounded-full bg-black">
    //     </div>

    <div className="w-10 h-10 rounded-full bg-black/80">
      <CircularProgressbar
        value={percentage}
        maxValue={10}
        text={`${percentage}`}
        styles={buildStyles({
          pathColor: `${rateStyle}`,
          textColor: `${rateStyle}`,
          textSize: 48,
          trailColor: "#000",
          backgroundColor: "#000",
        })}
      />
    </div>
  );
};

export default CircularProgress;
