import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LayoutList, Loader, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const router = useRouter();
  
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  
  if (callingState !== CallingState.JOINED) return <Loader />;
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">

      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Layout and Controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex item-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:bg-[#4c535b] rounded-lg",
                    { "bg-[#4c535b]": item.toLowerCase() === layout }
                  )}
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div 
          className={cn(
            "cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]",
            { "bg-[#4c535b]": showParticipants }
          )}
          >
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  );
};

export default MeetingRoom;
