import { ConsentModal } from "@/components/ConsentModal";
import { LoadingPage } from "./LoadingPage";
import { useLoadBg } from "@/hooks/useLoadBg";

const HomePage = () => {
  const { isBgLoaded } = useLoadBg("/01-home-page/homePageBg.png");

  if (!isBgLoaded) return <LoadingPage />;

  return (
    <div className="relative flex flex-col overflow-hidden w-1080 h-1920 bg-[url('/01-home-page/homePageBg.png')]">

      <div className="absolute bottom-[535px] left-[-54px] rotate-[5deg] border-[16px] border-white rounded-3xl">
        <img
          src="../01-home-page/present-model.png"
          alt="present-model"
          width={450}
          height={600}
        />
      </div>

      <div className="absolute bottom-[496px] right-[-60px] rotate-[-10deg] border-[16px] border-white rounded-3xl">
        <img
          src="../01-home-page/future-model.png"
          alt="future-model"
          width={450}
          height={600}
        />
      </div>

      <div className="absolute bottom-60 left-0 flex justify-center w-full z-40">
        <ConsentModal />
      </div>
    </div>
  );
};

export default HomePage;
