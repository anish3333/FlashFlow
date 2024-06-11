"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useEffect, useState } from "react";

const Home = () => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const [upcomingMeetingDateTime, setUpcomingMeetingDateTime] = useState("");

  const now = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && upcomingCalls && upcomingCalls.length > 0) {
        const latestCall = upcomingCalls[upcomingCalls.length - 1];
        if (latestCall.state && latestCall.state.startsAt) {
          const startsAt = new Date(latestCall.state.startsAt);

          const istStartsAtTime = startsAt.toLocaleTimeString("en-US", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
          });

          const istStartsAtDate = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
          }).format(startsAt);

          setUpcomingMeetingDateTime(`${istStartsAtDate} at ${istStartsAtTime}`);
        } else {
          setUpcomingMeetingDateTime("");
        }
      } else {
        setUpcomingMeetingDateTime("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingCalls, isLoading]);

  // Format time in IST
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  // Format date in IST
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism w-fit p-2 text-wrap rounded py-2  text-base font-normal">
            {isLoading
              ? "Loading..."
              : upcomingMeetingDateTime
              ? `Upcoming Meeting: ${upcomingMeetingDateTime}`
              : "No upcoming meeting"
            }
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
