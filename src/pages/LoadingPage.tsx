import LoadingBar from "@/components/LoadingBar";
import ParagonLoading from "./ParagonLoading";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LoadingPage: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showParagonLoading, setShowParagonLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromCapture) {
      setShowParagonLoading(true);
    }

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [location]);

  const handleCloseAd = () => {
    setShowParagonLoading(false);
    setShowButton(false);
  };

  return (
    <div className="relative flex flex-col overflow-hidden w-1080 h-1920 bg-[url('/03-waiting-page/waiting-bg.png')]">
      <div className="absolute repeat-infinite animate-bounce top-[526px] right-[394px]">
        <img
          src="/03-waiting-page/loading.svg"
          alt="loading"
          width="291px"
          height="77px"
        />
      </div>

      {showParagonLoading && <ParagonLoading />}

      <div className="absolute z-40 w-full top-[625px] left-[280px] ">
        <LoadingBar />
      </div>

      {showButton && showParagonLoading && (
        <button
          onClick={handleCloseAd}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full z-50"
        >
          Close Ad
        </button>
      )}
    </div>
  );
};

export { LoadingPage };
