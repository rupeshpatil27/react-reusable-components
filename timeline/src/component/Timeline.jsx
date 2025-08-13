import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data }) => {

  useGSAP(() => {
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".timeline-logo").forEach((logo) => {
      gsap.from(logo, {
        scale: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: logo,
          start: "top 45%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const animateFadeIn = (selector) => {
      gsap.utils.toArray(selector).forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 45%",
            toggleActions: "play none none reverse",
          },
        });
      });
    };

    animateFadeIn(".expText");
    animateFadeIn(".expText2");
    animateFadeIn(".expText-sm");

  }, []);

  return (
    <div className="relative pb-20">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-start pt-10 md:pt-40 md:gap-10"
        >
          <div className="sticky z-40 flex flex-col items-start self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
            <div className="timeline-logo absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-black-200">
              <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
            </div>

            <div className="expText flex-col hidden gap-0 text-xl md:flex md:pl-20">
              <h1 className="font-semibold text-3xl">
                {item.title}
              </h1>
              <p className="text-white-50 my-5">{item.date}</p>
              <p className="text-white-50">{item.job}</p>
            </div>
          </div>

          <div className="expText-sm relative w-full pl-20 pr-4 md:pl-4 block md:hidden">
            <div className="mb-4 text-left">
              <h1 className="font-semibold text-3xl">{item.title}</h1>
              <p className="text-white-50 my-5">{item.date}</p>
              <p className="text-white-50">{item.job}</p>
            </div>

            <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
              {item.contents.map((content, i) => (
                <li className="md:text-lg text-[16px]" key={i}>
                  {content}
                </li>
              ))}
            </ul>
          </div>

          <div className="expText2 relative w-full pl-20 pr-4 md:pl-4 md:block hidden">
            <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
              {item.contents.map((content, i) => (
                <li className="md:text-lg text-[16px]" key={i}>
                  {content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="absolute md:left-1 left-1 top-0 h-full flex justify-center bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <div className="timeline absolute h-[110%] -top-10 w-14 md:w-28 z-20 bg-black" />

        <div className="bg-gradient-to-t from-purple-500 to-lavender/50 rounded-full w-1 h-full" />
      </div>

    </div>
  );
};

export default Timeline;
