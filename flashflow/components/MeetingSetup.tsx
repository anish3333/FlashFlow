"use client";

import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete : (value: boolean) => void}) => {
  const [micAndCamOff, setMicAndCamOff] = useState(true);
  const call = useCall();
  if (!call)
    throw new Error("useCall must be used inside the StreamCall wrapper");
  
  useEffect(() => {
    if (micAndCamOff) {
      call?.microphone.disable();
      call?.camera.disable();
    } else {
      call?.microphone.enable();
      call?.camera.enable();
    }
  }, [micAndCamOff, call]);
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <div className="max-w-[700px]">
        <VideoPreview />
      </div>
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={micAndCamOff}
            onChange={(e) => setMicAndCamOff(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
