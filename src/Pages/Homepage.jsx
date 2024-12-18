import React, { Component } from "react";
import Spline from "@splinetool/react-spline";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import "./Homepage.css";

function Homepage() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  gsap.registerPlugin(useGSAP);

  const nulltechTitle = useRef();

  useGSAP(
    () => {
      gsap.from(".big-title", {
        x: 360,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: nulltechTitle }
  );

  return (
    <ReactLenis root>
      <div data-theme="dark">
        <div className="navbar fixed z-20 backdrop-blur-2xl">
          <div className="flex-1">
            <img
              src="ntp2024_logo.svg"
              className="btn btn-ghost text-xl w-32"
            ></img>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Dizzylab</a>
              </li>
              <li>
                <details>
                  <summary>Event</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a>NTP1</a>
                    </li>
                    <li>
                      <a>NTP2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-screen flex md:flex-row flex-col justify-between bg-black overflow-hidden">
          <div
            className="flex flex-col justify-center mx-10 md:ml-10 h-full w-auto leading-tight z-10"
            ref={nulltechTitle}
          >
            <h1 className="text-2xl font-bold mb-2 ~ml-1/2 big-title">
              无技术草履虫
            </h1>
            <h2 className="text-[7rem] font-bold mb-4 leading-none ~text-6xl/8xl big-title">
              NULLTECH
            </h2>
            <h2 className="text-4xl font-bold ~ml-1/2 big-title">PARAMECIUM</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start md:space-x-4">
              <a className="btn btn-primary mt-6 w-full md:w-48">
                Dizzylab
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 transition-transform duration-300 hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </a>
              <a className="btn btn-neutral mt-6 w-full md:w-48" href="https://space.bilibili.com/3546388319177513">Bilibili</a>
            </div>
          </div>
          <div className="w-[720rem] xl:w-full static opacity-20 xl:opacity-100">
            {/* <Spline scene="https://prod.spline.design/T2YezWy8vr3x1qE8/scene.splinecode" /> */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block absolute top-16 overflow-hidden md:-top-6 md:right-[1rem] md:w-[50rem] xl:relative xl:w-full"
            >
              <source src="cubic_c1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        <div className="w-full h-screen flex md:flex-row flex-col justify-center items-center bg-black overflow-x-hidden">
          <div className="flex flex-col justify-center items-center text-center h-full w-auto leading-tight ">
            <h2 className="text-[7rem] font-extrabold mb-4leading-none ~text-4xl/6xl text-white">
            浏览所有专辑
            </h2>
          </div>
        </div>

        <div className="w-full h-screen flex md:flex-row flex-col justify-center items-center bg-primary overflow-x-hidden">
          <div className="flex flex-col justify-center items-center text-center h-full w-auto leading-tight ">
            <h2 className="text-[7rem] font-extrabold mb-4 leading-none ~text-6xl/8xl text-primary-content">
            HOW WE WORK
            </h2>
          </div>
        </div>

        <div className="w-full h-screen flex md:flex-row flex-col justify-between bg-black overflow-x-hidden">
        <div className="flex flex-col justify-center ml-10 h-full w-auto leading-tight ">
            <h2 className="text-[7rem] font-bold mb-4 leading-none ~text-6xl/8xl">
              NULLTECH
            </h2>
            <h1 className="text-2xl font-bold mb-2">
              一群草履虫的快乐创新社团
            </h1>
            <h2 className="text-4xl font-bold">PARAMECIUM</h2>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}

export default Homepage;
