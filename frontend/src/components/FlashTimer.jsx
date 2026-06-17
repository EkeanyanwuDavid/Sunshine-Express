import { useState, useEffect } from "react";
import { FaBolt, FaClock, FaFire } from "react-icons/fa";
const FlashTimer = () => {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 15,
    seconds: 0,
  });
  const [sold, setSold] = useState(87);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 15;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });

      setSold((prev) => prev + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const boxStyle =
    "bg-white/20 px-3 py-2 rounded-md text-lg font-bold min-h-[45px] text-center backdrop-blur";
  return (
    <div className="bg-linear-to-r  from-red-600  to-red-500  text-white py-4 px-4 rounded flex flex-col md:flex-row items-center justify-between gap-4 mb-9">
      <div className="flex items-center gap-2 text-lg font-bold">
        <FaBolt className="text-yellow-300 animate-pulse" />
        Flash Sale Live
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium mr-2 opacity-90">Ends in:</span>

        <div className={boxStyle}>{String(time.hours).padStart(2, "0")}</div>
        <span>:</span>
        <div className={boxStyle}>{String(time.minutes).padStart(2, "0")}</div>
        <span>:</span>

        <div className={boxStyle}>{String(time.seconds).padStart(2, "0")}</div>
      </div>

      <div className="flex items-center gap-2 text-lg bg-white/15 px-3 py-1 text-white rounded-full">
        <FaFire className="text-yellow-300 animate-pulse" />
        <span>{sold}+ sold today</span>
      </div>
    </div>
  );
};

export default FlashTimer;
