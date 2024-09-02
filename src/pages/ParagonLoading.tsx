// import LoadingBar from "@/components/LoadingBar";

const ParagonLoading = () => {
  return (
    <div>
      {/* <div className="absolute z-40 w-full bottom-[1209px] left-[280px] ">
        <LoadingBar />
      </div> */}
      <div>
        <img
          src="/ads.png"
          alt="ads"
          className="absolute z-60 w-[750px] bottom-[150px] left-[175px] rounded-2xl border-white border-[10px]"
        />
        {/* <video
          src="/paragonAds.mp4"  // Replace with the correct video source path
          // alt="paragonAds"
          className="absolute z-30 w-[836px] bottom-[64px] left-[116px] rounded-2xl"
          autoPlay
          loop
          muted
          controls={false}  
        /> */}
      </div>
    </div>
  );
};

export default ParagonLoading;
