import { ConsentModal } from "@/components/ConsentModal";
import { LoadingPage } from "./LoadingPage";
import { useLoadBg } from "@/hooks/useLoadBg";

const HomePage = () => {
  const { isBgLoaded } = useLoadBg("/01-home-page/homePageBg.png");

  if (!isBgLoaded) return <LoadingPage />;

  return (
    <div className="relative flex flex-col overflow-hidden w-[100vw] h-[100vh] bg-[url('/01-home-page/homePageBg.png')] bg-cover bg-center">
      <div className="absolute bottom-[25vh] left-[-5vw] rotate-[5deg] border-[16px] border-white rounded-3xl max-w-[45vw]">
        <img
          src="../01-home-page/present-model.png"
          alt="present-model"
          className="w-full h-auto"
        />
      </div>

      <div className="absolute bottom-[25vh] right-[-6vw] rotate-[-10deg] border-[16px] border-white rounded-3xl max-w-[45vw]">
        <img
          src="../01-home-page/future-model.png"
          alt="future-model"
          className="w-full h-auto"
        />
      </div>

      <div className="absolute bottom-[237px] left-0 flex justify-center w-full z-40">
        <ConsentModal />
      </div>
    </div>
  );
};

export default HomePage;
