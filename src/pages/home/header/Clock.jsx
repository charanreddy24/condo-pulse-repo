import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const torontoTimeOptions = {
    timeZone: "America/Toronto",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };

  const torontoDateOptions = {
    timeZone: "America/Toronto",
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <p>{time.toLocaleString("en-US", torontoDateOptions)}</p>
      <p>{time.toLocaleString("en-US", torontoTimeOptions)}</p>
    </div>
  );
}
