//not using
import LinkButton from "@/components/LinkButton";
import { useLoadBg } from "@/hooks/useLoadBg";
import { useTimeout } from "@/hooks/useTimeout";
import { LoadingPage } from "./LoadingPage";

const AdsPage = () => {
  const { isBgLoaded } = useLoadBg(
    "/06-advertising-page/advertising-page-bg.png"
  );
  useTimeout({ duration: 60 * 1000 });

  if (!isBgLoaded) return <LoadingPage />;

  return (
    <div className="relative flex flex-col w-1080 h-1920 overflow-hidden bg-[url('/06-advertising-page/advertising-page-bg.png')] bg-contain">
      <img
        src="../06-advertising-page/qr-code.png"
        alt="qr"
        className="w-[535px] h-[525px] mt-[335px] mx-auto"
      />

      <LinkButton
        content="กลับหน้าเเรก"
        href="/"
        icon={<img src="/next-icon.svg" />}
        className="absolute flex flex-row items-center gap-4 bottom-[239px] left-[333px]"
      />
    </div>
  );
};

export default AdsPage;
