import LoadingBar from "@/components/LoadingBar";
import ParagonLoading from "./ParagonLoading";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="relative flex flex-col items-center justify-center overflow-hidden w-[100vw] h-[100vh] bg-[url('/03-waiting-page/waiting-bg.png')] bg-cover bg-center">
      {/* relative flex flex-col items-center justify-center overflow-hidden w-[100vw] h-[100vh] bg-[url('/02-capture-page/capturing-page-bg.png')] bg-cover bg-center */}
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
        <Button
          className="font-primaryRegular text-white text-3xl py-4 px-16 rounded-full border-4 border-white bg-[#F882AA] shadow-2xl absolute bottom-20 left-1/2 transform -translate-x-1/2"
          onClick={handleCloseAd}
        >
          Close
        </Button>
      )}
    </div>
  );
};

export { LoadingPage };
