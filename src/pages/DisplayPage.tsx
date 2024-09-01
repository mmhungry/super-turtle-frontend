//not using
// import LinkButton from "@/components/LinkButton";
import { useToast } from "@/components/ui/use-toast";
import { UrlKey } from "@/constants/UrlKeys";
import { DEFAULT_TIMEOUT } from "@/constants/timeout";
import { useLoadBg } from "@/hooks/useLoadBg";
import { useTimeout } from "@/hooks/useTimeout";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";

const DisplayPage = () => {
  useTimeout({ duration: DEFAULT_TIMEOUT });
  const sunscreenUrl = localStorage.getItem(UrlKey.URL);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isBgLoaded } = useLoadBg("/05-display-page/display-page-bg.png");

  if (!sunscreenUrl) {
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

  if (!isBgLoaded) return <LoadingPage />;

  return (
    <>
      <div className="relative flex flex-col w-1080 h-1920 overflow-hidden bg-[url('/05-display-page/display-page-bg.png')] bg-contain">
        {/* Image with a white border frame */}
        <div className="absolute w-[810px] h-[810px] bottom-[360px] left-[140px] rounded-2xl border-8
         border-white z-10">
          {sunscreenUrl && (
            <img
              src={sunscreenUrl}
              alt="no sunscreen"
              width="810px"
              height="810px"
              className="rounded-2xl"
            />
          )}
        </div>

        {/* Top left image with a white border frame */}

        {/* <img
          src="../05-display-page/text-top-left.svg"
          alt="text-top"
          className="w-full h-full rounded-lg"
        />

        <img
          src="../05-display-page/text-bottom-right.svg"
          alt="text-bottom"
          className="w-full h-full rounded-lg"
        /> */}

        {/* <LinkButton
          content="รับครีมกันแดด"
          href="/ads"
          className="absolute bottom-[168px] left-[357px]"
        /> */}
      </div>
    </>
  );
};

export default DisplayPage;