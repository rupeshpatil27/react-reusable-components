import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data, triggerContainerRef }) => {
  const ref = useRef(null);
  const progressLineRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (triggerContainerRef?.current && ref.current) {
      setIsReady(true);
    }
  }, [triggerContainerRef?.current]);

  useGSAP(() => {
    if (!triggerContainerRef.current || !ref.current) return;

    const timelineHeight = ref.current?.getBoundingClientRect().height;

    gsap.fromTo(
      progressLineRef.current,
      {
        height: 0,
      },
      {
        height: timelineHeight,
        ease: "none",
        scrollTrigger: {
          trigger: triggerContainerRef.current,
          start: "top 40%",
          end: "bottom 50%",
          scrub: true,
          markers: false,
        },
      }
    );

  }, [isReady]);

  return (
    <div ref={ref} className="relative pb-20 w-full h-full">
      {data.map((item, index) => (
        <div
          key={index}
          className="expText flex justify-start pt-10 md:pt-40 md:gap-10"
        >
          <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
            <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-black-200">
              <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
            </div>
            <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
              <h3>{item.date}</h3>
              <h3 className="text-3xl text-neutral-400">{item.title}</h3>
              <h3 className="text-3xl text-neutral-500">{item.job}</h3>
            </div>
          </div>

          <div className="relative w-full pl-20 pr-4 md:pl-4">
            <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
              <h3>{item.date}</h3>
              <h3>{item.job}</h3>
            </div>
            {item.contents.map((content, i) => (
              <p className="mb-3 font-normal text-neutral-400" key={i}>
                {content}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] h-full">
        <div
          ref={progressLineRef}
          className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
        />
      </div>
    </div>
  );
};

export default Timeline;
