import LoadingBar from "@/components/LoadingBar";
import ParagonLoading from "./ParagonLoading";

interface Props {
  shouldShowLoadingBar?: boolean;
}
const LoadingPage: React.FC<Props> = ({ shouldShowLoadingBar }) => {
  const location = localStorage.getItem("location");

  return (
    <div className="w-full h-[100vh] bg-[url('/03-waiting-page/waiting-bg.png')] overflow-hidden bg-contain relative">
      <div className="absolute repeat-infinite animate-bounce top-[501px] right-[394px]">
        <img
          src="/03-waiting-page/loading.svg"
          alt="loading"
          width="291px"
          height="77px"
        />
      </div>

      {shouldShowLoadingBar && location === "SCB_NEXT_TECH" ? (
        <ParagonLoading />
      ) : (
        <div className="absolute z-40 w-full bottom-[700px] left-[280px] ">
          <LoadingBar />
        </div>
      )}
    </div>
  );
};

export { LoadingPage };
