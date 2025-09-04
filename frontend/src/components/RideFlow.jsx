import React, { useEffect, useState } from "react";
import ConfirmedRide from "./ConfirmedRide";
import WaitingForDriver from "./WaitingForDriver";

const RideFlow = () => {
  const [showWaiting, setShowWaiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaiting(true);  // 8s baad switch karega
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWaiting ? <WaitingForDriver /> : <ConfirmedRide />}
    </>
  );
};

export default RideFlow;
