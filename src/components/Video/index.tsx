"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import Chart from "../Chart";

const Video = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simulated Scenario"
          paragraph="Gravity Drained Tanks"
          center
          mb="80px"
        />
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Chart />
                <Chart />
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
