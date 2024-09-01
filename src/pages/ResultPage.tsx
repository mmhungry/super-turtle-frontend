import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import baseAxios from "@/common/axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";
import { useUrlQuery } from "@/hooks/useUrlQuery";
import { ImageResponse } from "@/types/api";
import { UrlKey } from "@/constants/UrlKeys";
import { useRecordVideo } from "@/hooks/useRecordVideo";
import LinkButton from "@/components/LinkButton";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTimeout } from "@/hooks/useTimeout";
import { useLoadBg } from "@/hooks/useLoadBg";
import { DEFAULT_TIMEOUT } from "@/constants/timeout";
import { Button } from "@/components/ui/button";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, vmResponseId } = location.state || {};
  const [isPriceDropped, setIsPriceDropped] = useState(false);

  useEffect(() => {
    console.log("Gender state received in ResultPage:", gender);
    console.log("VM Response ID received:", vmResponseId);
  }, [gender, vmResponseId]);

  const handleDropPrice = () => {
    setIsPriceDropped(true);
    console.log("Price dropped for VM response ID:", vmResponseId);
  };

  const [backgroundUrl, setBackgroundUrl] = useState(
    "/04-result-page/result-page-bg.png"
  );

  useEffect(() => {
    const normalizedGender = gender?.toUpperCase().trim();

    const newBackgroundUrl =
      normalizedGender === "MALE"
        ? "/04-result-page/boy-page-bg.png"
        : normalizedGender === "FEMALE"
        ? "/04-result-page/girl-page-bg.png"
        : "/04-result-page/result-page-bg.png"; // Fallback for unidentified gender

    // Set the background URL with a timestamp to bypass caching
    setBackgroundUrl(`${newBackgroundUrl}?v=${new Date().getTime()}`);
  }, [gender]);

  const { isBgLoaded } = useLoadBg(backgroundUrl); // Load background image with updated URL

  const { id, noSunscreenRefId, sunscreenRefId } = useUrlQuery();
  const [sunscreenImgUrl, setSunscreenImgUrl] = useState<string>("");
  const [noSunscreenImgUrl, setNoSunscreenImgUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useQuery<ImageResponse | undefined>({
    queryKey: ["facial-transform-poll", id],
    queryFn: async () => {
      const endpoints = `/facial-transform-poll/${id}?${UrlKey.SUNSCREEN}=${sunscreenRefId}&${UrlKey.NOSUNSCREEN}=${noSunscreenRefId}`;

      try {
        setIsLoading(true);
        const resp = await baseAxios.get(endpoints);

        const data: ImageResponse = resp.data;
        setNoSunscreenImgUrl(data.noSunscreenImgUrl);
        setSunscreenImgUrl(data.sunscreenImgUrl);
        localStorage.setItem(UrlKey.URL, data.sunscreenImgUrl);
        if (data.status === "succeeded") {
          setIsLoading(false);
        }
        return data;
      } catch (error) {
        console.error("Error fetching result: ", error);
        setIsLoading(false);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction onClick={() => navigate("/")} altText="Try again">
              back to home
            </ToastAction>
          ),
          variant: "destructive",
        });
      }
    },
    refetchInterval: (query) => {
      return query.state.data?.status === "pending" ? 10000 : false;
    },
  });

  useEffect(() => {}, [isBgLoaded]);

  if (isLoading || !isBgLoaded) {
    return <LoadingPage shouldShowLoadingBar={true} />;
  }

  const NavigationButtons = () => {
    useTimeout({ duration: DEFAULT_TIMEOUT });
    useRecordVideo();
    return (
      <div className="absolute bottom-[168px] flex flex-row items-center justify-between w-full px-10">
        <LinkButton
          href="/"
          icon={<img src="/back-icon.svg" width="60px" />}
          className="rounded-full p-7 from-white to-white"
        />
      </div>
    );
  };

  return (
    <div
      className="relative flex flex-col w-1080 h-1920 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute bg-white w-[460px] h-[460px] bottom-[550px] left-[70px] rounded-2xl z-10 border-8
         border-white"
      >
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-2xl" />
        ) : (
          <img
            src={noSunscreenImgUrl}
            className="rounded-2xl"
            alt="result"
            height="460px"
            width="460px"
          />
        )}
      </div>
      <div
        className="absolute bg-white w-[460px] h-[460px] bottom-[550px] right-[70px] rounded-2xl z-10 border-8
         border-white"
      >
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-2xl" />
        ) : (
          <img
            src={sunscreenImgUrl}
            className="rounded-2xl"
            alt="result"
            height="460px"
            width="460px"
          />
        )}
      </div>
      <div className="absolute bottom-[100px] w-full flex justify-center">
        {isPriceDropped ? (
          <p>The price has been dropped!</p>
        ) : (
          <Button
            className={`flex flex-row items-center gap-3 absolute font-primaryBold bottom-[237px] left-[377px] text-7xl py-12 px-16 rounded-full border-4 border-white bg-[#F882AA] text-white shadow-2xl z-50`}
            onClick={handleDropPrice}
          >
            Click here
          </Button>
        )}
      </div>
      <NavigationButtons />
    </div>
  );
};

export default ResultPage;
