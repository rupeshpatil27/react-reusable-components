import { useRef } from "react";
import Timeline from "./component/Timeline";

const App = () => {
  const data = [
    {
      title: "Software Developer",
      job: "Security & Defense Projects",
      date: "2021-2023",
      contents: [
        "Enhanced application security and developed new features, adhering to standards set by the Passive Defense Organization and National Cyberspace Center.",
        "Designed and implemented intuitive map interfaces using MapsUI, enhancing user experience and enabling seamless interactive map integration.",
        "Developed applications for industrial automation, leveraging C++ and the Fatek API for PLC communication.",
        "Enhanced responsiveness and usability of applications using Windows Forms and WPF frameworks.",
        "Executed XML to SVG conversions using X-DOM, ensuring dynamic and efficient data visualization.",
      ],
    },
    {
      title: "Back-End Developer",
      job: "Car Manufacture",
      date: "2023-2024",
      contents: [
        "Engineered systems for large-scale data ingestion and analysis, ensuring efficient data processing and storage.",
        "Developed back-end systems enabling vehicle-to-cloud communication for telemetry, diagnostics, and remote control:",
        "✅ Implemented secure APIs, following ISO 26262 automotive safety standards.",
        "✅ Ensured data privacy for customers and partners through industry-compliant protocols.",
        "✅ Delivered remote features like over-the-air updates, real-time tracking, and remote start capabilities.",
      ],
    },
    {
      title: "Freelance Developer",
      job: "Self-Employed",
      date: "2025-Present",
      contents: [
        "Created a personal portfolio using Three.js, React, Vite, and WebAPI to showcase technical expertise.",
        "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
        "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
        "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
        "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
        "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
      ],
    },
  ];

  const containerRef = useRef(null);
  return (
    <>
      <div className="min-h-[50vh]"></div>
      <div
        ref={containerRef}
        className="sm:px-10 px-5 lg:px-15 min-h-screen pt-20 md:pt-30 z-10"
      >
        <h2 className="font-bold text-3xl md:text-4xl text-center">Timeline</h2>
        <Timeline data={data} triggerContainerRef={containerRef} />
      </div>
      <div className="min-h-screen"></div>
    </>
  );
};

export default App;
