interface CountdownTimerProps {
  remaining: number;
  isCounting: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  remaining,
  isCounting,
}) => {
  return (
    <div>
      {isCounting && remaining > 0 && (
        <div>
          <div className="flex flex-row justify-center gap-4 mt-[1474px] ">
            {/* <img
              src="/arrow-up-icon.svg"
              alt="arrow-up"
              className="w-[70px] h-[70px] self-center "
            /> */}
            {/* <h1 className=" font-primaryBold text-7xl text-[#F882AA] text-stroke-white text-stroke-2 z-20">
              Look at the camera
            </h1> */}
            {/* <img
              src="/arrow-up-icon.svg"
              alt="arrow-up"
              className="w-[70px] h-[70px] self-center"
            /> */}
          </div>

          <img
            src={`/02-capture-page/${remaining}.svg`}
            alt={`Countdown ${remaining}`}
            className="w-1/4 h-1/4 absolute bottom-[955px] left-[404px] z-30"
          />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
