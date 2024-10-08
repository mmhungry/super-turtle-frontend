import { Button } from "@/components/ui/button";
import baseAxios from "@/common/axios";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "@/components/CountdownTimer";
import Spinner from "@/components/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTimeout } from "@/hooks/useTimeout";
import { DEFAULT_TIMEOUT } from "@/constants/timeout";
import { useLoadBg } from "@/hooks/useLoadBg";
import { LoadingPage } from "./LoadingPage";
import axios from "axios";
const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const CapturePage = () => {
  const { isBgLoaded } = useLoadBg("/02-capture-page/capturing-page-bg.png");
  const DEFAULT_COUNT_DOWN_TIME = 5;
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(DEFAULT_COUNT_DOWN_TIME);
  const [isCounting, setIsCounting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { toast } = useToast();
  useTimeout({ duration: DEFAULT_TIMEOUT });

  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current?.getScreenshot();

      if (imageSrc) {
        const resp = await baseAxios.post("/facial-transform", {
          imgData: imageSrc,
        });
        const data = resp.data;

        const genderCheckUrl =
          "https://3dn4evazn4.execute-api.ap-southeast-1.amazonaws.com/prod/api/classify-gender";
        const healthCheckToken = "gender-class-ztn6vhv6avc-AMT2hkh";

        const base64Image = imageSrc.split(",")[1]; // Assuming imageSrc is in 'data:image/jpeg;base64,...' format

        const genderCheckResp = await axios.post(genderCheckUrl, base64Image, {
          headers: {
            Authorization: `Bearer ${healthCheckToken}`,
            "Content-Type": "text/plain",
            Accept: "application/json",
          },
        });

        const { gender } = genderCheckResp.data;

        //VM Server
        // const vmServerApiUrl = "";
        // const vmCode = "";

        // const vmResponse = await axios.post(vmServerApiUrl, {
        //   vmCode: vmCode,
        //   gender: gender,
        // });
        // console.log("vm resp:", vmResponse)

        // Simulate VM response with a mock ID
        // const mockVmResponseId = "mock-vm-response-id-123";

        navigate(
          `/result?refId=${data.id}&sunscreenRefId=${data.sunscreenRefId}&noSunscreenRefId=${data.noSunscreenRefId}`,
          {
            state: {
              fromCapture: true,
              gender,
              // vmResponseId: mockVmResponseId,
            },
          } // Pass the gender and mock VM response ID
        );
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction
            onClick={() => {
              setButtonDisabled(false);
              navigate("/capture");
            }}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  const startCapture = () => {
    if (!buttonDisabled) {
      setIsCounting(true);
      setButtonDisabled(true);

      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            clearInterval(countdownInterval);
            setIsCounting(false);
            capture();
          }
          return newTime;
        });
      }, 1000);
    }
  };

  if (!isBgLoaded) return <LoadingPage />;

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden w-[100vw] h-[100vh] bg-[url('/02-capture-page/capturing-page-bg.png')] bg-cover bg-center">
      
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="z-10 absolute bottom-[450px] left-[190px] rounded-[48px]"
      />

      <CountdownTimer remaining={remainingTime} isCounting={isCounting} />

      <div className="absolute h-[720px] w-[720px] bottom-[450px] left-[190px] bg-center bg-[url('/person-shadow.svg')] bg-contain z-20 opacity-75 bg-no-repeat rounded-[48px]" />
      <Button
        className={`flex flex-row items-center gap-3 absolute font-primaryBold bottom-[237px] left-[377px] text-7xl py-12 px-16 rounded-full border-4 border-white bg-[#F882AA] text-white shadow-2xl z-50 ${
          buttonDisabled && "opacity-50 left-[338px]"
        }`}
        onClick={startCapture}
        disabled={buttonDisabled}
      >
        Capture
        {buttonDisabled && <Spinner />}
      </Button>
    </div>
  );
};

export default CapturePage;
