/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import "./Homepage.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AsciiEffect,
  GLTFLoader,
  OrbitControls,
  RoomEnvironment,
} from "three/examples/jsm/Addons.js";
import { Suspense } from "react";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
import { PerspectiveCamera } from "three";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { rand } from "three/tsl";
import profiles from "../models/profiles";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(Flip);

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  const ref = useRef();
  // 动画逻辑：每帧更新模型的旋转
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime();
    }
  });

  return <primitive ref={ref} object={gltf.scene} />;
}
function Homepage() {
  // eslint-disable-next-line no-unused-vars
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  const lenisRef = useRef();
  const sceneRef = useRef();
  const renderer = new WebGLRenderer();
  const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
  const asciiRef = useRef();
  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  const [totalProfiles, setTotalProfiles] = useState(profiles.getAllProfiles());

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    document.body.appendChild(effect.domElement);

    asciiRef.current = effect;

    function animate() {
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  // useEffect(() => {
  //   const ntp1 = profiles.ntp1;
  //   const ntp2 = profiles.ntp2;
  //   const ntp3 = profiles.ntp3;

  //   const totalProfiles = ntp1.concat(ntp2, ntp3);

  //   setTotalProfiles(totalProfiles);
  // }, [totalProfiles]);

  const nulltechTitle = useRef();
  const albumsDiv = useRef();
  const ourWorksDiv = useRef();

  useGSAP(
    () => {
      gsap.from(".big-title", {
        x: 360,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.2,
      });
      gsap.from(".title-btn", {
        x: 360,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: nulltechTitle }
  );

  useGSAP(
    () => {
      gsap.from(".ablum-overlook-title", {
        scrollTrigger: {
          trigger: ".ablum-overlook-title",
          toggleActions: "play none none reverse",
        },
        text: "NULLTECH",
        duration: 1,
        opacity: 0,
        ease: "power2.in",
      });
      gsap.from(".showcase-card", {
        scrollTrigger: {
          trigger: ".showcase-card",
          toggleActions: "play none none reverse",
        }, // start the animation when enters the viewport (once)
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: albumsDiv }
  );

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".super-primary-panel",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=300%",
      },
    });

    tl.from(".about-us-title", {
      duration: 10,
      y: -100,
      opacity: 0,
      text: "NULLTECH PARAMECIUM",
      ease: "power2.inOut",
    });

    tl.from(
      ".about-us-title2",
      {
        duration: 11,
        y: -100,
        opacity: 0,
        text: "我们是一群草履虫",
        ease: "power2.inOut",
      },
      "<"
    );

    tl.to(
      ".about-us-title2",
      {
        duration: 1,
        y: 0,
        opacity: 1,
        text: "何为虫社？",
        ease: "power2.inOut",
      },
      "+=5"
    );

    tl.to(
      ".about-us-title",
      {
        duration: 3,
        x: "-50vw",
        opacity: 0,
      },
      "<"
    );

    tl.to(
      ".about-us-title2",
      {
        duration: 3,
        x: "-50vw",
        opacity: 0,
        ease: "power2.inOut",
      },
      "<"
    );

    tl.from(
      ".about-us-title3",
      {
        x: "50vw",
        duration: 4,
        opacity: 0,
        text: "WHAT IS NULLTECH PARAMECIUM?",
        ease: "power2.inOut",
      },
      "-=2"
    );

    tl.from(
      ".about-us-title4",
      {
        x: "50vw",
        duration: 6,
        opacity: 0,
        text: "WHAT IS NULLTECH PARAMECIUM?",
        ease: "power2.inOut",
      },
      "<"
    );
    tl.to(
      ".about-us-title3",
      {
        x: "-50vw",
        duration: 4,
        opacity: 0,
        text: "NULL",
      },
      "+=5"
    );
    tl.to(
      ".about-us-title4",
      {
        x: "-50vw",
        duration: 2,
        opacity: 0,
        text: "NULL",
      },
      "<"
    );
    tl.from(
      ".about-us-title5",
      {
        x: "50vw",
        duration: 4,
        opacity: 0,
        text: "WHAT IS NULLTECH PARAMECIUM?",
        ease: "power2.inOut",
      },
      "-=2"
    );
    tl.from(
      ".about-us-title6",
      {
        x: "50vw",
        duration: 4,
        opacity: 0,
        text: "WHAT IS NULLTECH PARAMECIUM?",
        ease: "power2.inOut",
      },
      "<"
    );
    tl.to(".about-us-title5", { duration: 4 });

    let peoplePanel = gsap.utils.toArray(".people-panel");
    peoplePanel.forEach((panel) => {
      let y = gsap.utils.random(-100, 100);
      panel.style.transform = `translateY(${y}px)`;
    });

    tl.fromTo(
      peoplePanel,
      {
        x: "100vw",
        opacity: 1,
        duration: 15,
        stagger: 1,
      },
      {
        x: "-100vw",
        opacity: 0.6,
        duration: 15,
        stagger: 1,
      }
    );

    tl.to(
      ".about-us-title5",
      {
        y: -200,
        fontSize: "2.8rem",
        text: "草履虫们",
        duration: 4,
      },
      "<"
    );
    tl.to(
      ".about-us-title6",
      {
        y: -200,
        fontSize: "1.8rem",
        text: "所有参专人员",
        duration: 4,
      },
      "<"
    );

    let viewNtpBtn = gsap.utils.toArray(".view-ntp-btn");

    tl.fromTo(
      viewNtpBtn,
      {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        y: 100,
      },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        y: 0,
      }
    );

    tl.to(".about-us-title5", {
      text: "访问虫社官方账号",
      fontSize: "2rem",
      y: -200,
      duration: 2,
    });

    tl.to(
      ".about-us-title6",
      {
        text: "查看所有参专人员",
        fontSize: "1.5rem",
        y: -200,
        duration: 2,
      },
      "-=2"
    );
  });

  useGSAP(() => {
    // 持续晃动函数
    const continuousShake = (target) => {
      gsap.to(target, {
        x: () => gsap.utils.random(-5, 15), // 随机生成 x 偏移值
        y: () => gsap.utils.random(-5, 15), // 随机生成 y 偏移值
        duration: 2, // 每次晃动的持续时间（较长，使晃动更柔和）
        repeat: -1, // 无限循环
        yoyo: true, // 来回晃动
        ease: "power1.inOut", // 缓动函数
      });
    };

    gsap.from(".zero-two-title", {
      rotation: 10,
      duration: 0.5,
      x: -50,
      y: 50,
      scale: 2,
      opacity: 0,
      scrollTrigger: {
        trigger: ".zero-two-title",
        start: "top center 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".ntp-02-preview", {
      scrollTrigger: {
        trigger: ".ntp-02-preview",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 100,
    });

    gsap.from(".ntp-02-video", {
      scrollTrigger: {
        trigger: ".ntp-02-video",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -100,
      rotationY: 0,
      onComplete: () => {
        continuousShake(".ntp-02-video");
      },
    });

    const container = document.querySelector(
      ".ntp-02-preview-bg-container .flex-col"
    );
    const h1Elements = document.querySelectorAll(".ntp-02-preview-bg-title");

    // 计算单个 <h1> 标签的高度（因为垂直排列）
    const h1Height = h1Elements[0].offsetHeight;

    // 计算三行标题的总高度
    const totalHeight = h1Height * 3;

    // 滚动动画
    gsap.to(container, {
      y: -totalHeight, // 向上移动三行标题的高度
      duration: 10, // 动画持续时间
      ease: "none", // 线性缓动
      repeat: -1, // 无限循环
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight), // 实现无缝循环
      },
    });
  });

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
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
                <a href="https://www.dizzylab.net/l/NullTech_PARAMECIUM/">Dizzylab</a>
              </li>
              <li>
                <details>
                  <summary>Event</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a href="https://www.dizzylab.net/d/NTP-001/">NTP1</a>
                    </li>
                    <li>
                      <a href="https://www.dizzylab.net/d/NTP-002/">NTP2</a>
                    </li>
                    <li>
                      <a href="https://www.dizzylab.net/d/NTP-003/">NTP3</a>
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
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start md:space-x-4 title-btn">
              <a
                className="btn btn-primary mt-6 w-full md:w-48"
                href="https://www.dizzylab.net/l/NullTech_PARAMECIUM/"
              >
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
              <a
                className="btn btn-neutral mt-6 w-full md:w-48"
                href="https://space.bilibili.com/3546388319177513"
              >
                Bilibili
              </a>
            </div>
          </div>
          <div className="w-[720rem] xl:w-full static opacity-20 xl:opacity-100">
            {/* <Spline scene="https://prod.spline.design/T2YezWy8vr3x1qE8/scene.splinecode" /> */}
            {/* <Canvas>
              <ambientLight intensity={Math.PI / 2} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
              />
              <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
              />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas> */}
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
        {/* 专辑一览 */}
        <div
          ref={albumsDiv}
          className="w-full h-full md:h-screen flex md:flex-row flex-col justify-center items-center overflow-x-hidden bg-black grid-bg"
        >
          <div className="flex flex-col justify-center items-center text-center h-full w-auto leading-tight ">
            <h2 className="text-[7rem] font-extrabold mb-4leading-none ~text-4xl/6xl text-white ablum-overlook-title">
              专辑一览
            </h2>
            <div className="h-10"></div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-10">
              <div className=" bg-base-200 rounded-xl w-60 showcase-card">
                <a href="https://www.dizzylab.net/d/NTP-001/">
                  <img
                    src="images/NTP-001.jpg"
                    className="w-60 object-cover rounded-xl shadow-lg shadow-white/20 hover:transform hover:scale-105 transition-transform duration-300"
                  ></img>
                </a>
                <div className="text-start p-2">
                  <h1 className="text-xl font-bold">TECH BOOT UP!!!! 01</h1>
                  <h2 className="text-sm">NTP-001</h2>
                </div>
              </div>
              <div className="bg-base-200 rounded-xl w-60 showcase-card">
                <a href="https://www.dizzylab.net/d/NTP-002/">
                  <img
                    src="images/NTP-002.jpg"
                    className="w-60 object-cover rounded-xl shadow-lg shadow-white/20 hover:transform hover:scale-105 transition-transform duration-300"
                  ></img>
                </a>
                <div className="text-start p-2">
                  <h1 className="text-xl font-bold">NTP SHOWCASE</h1>
                  <h2 className="text-sm">NTP-002</h2>
                </div>
              </div>
              <div className="bg-base-200 rounded-xl w-60 showcase-card">
                <a href="https://www.dizzylab.net/d/NTP-003/">
                  <img
                    src="images/NTP-003.jpg"
                    className="w-60 object-cover rounded-xl shadow-lg shadow-white/20 hover:transform hover:scale-105 transition-transform duration-300"
                  ></img>
                </a>
                <div className="text-start p-2">
                  <h1 className="text-xl font-bold">PSYCHEDELiX MIND</h1>
                  <h2 className="text-sm">NTP-003</h2>
                </div>
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        </div>
        <div
          className="w-full h-screen flex md:flex-row flex-col justify-center items-center bg-primary overflow-x-hidden super-primary-panel"
          ref={ourWorksDiv}
        >
          <div className="flex flex-col justify-center items-center text-center h-full w-auto leading-tight about-us-panel">
            <h2 className="text-[7rem] font-extrabold mb-4 leading-none ~text-6xl/8xl text-primary-content about-us-title">
              ABOUT US
            </h2>
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title2">
              NULLTECH PARAMECIUM
            </h3>

            {/* <Canvas
              className="absolute"
              style={{ position: "absolute" }}
              onCreated={({ scene, camera }) => {
                sceneRef.current = scene;
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />

              <Suspense>
                <Model url="models/toilet.glb" />
              </Suspense>
            </Canvas> */}
          </div>
          <div className="flex flex-col absolute justify-center items-center text-center h-full w-auto leading-tight panel">
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title3">
              我们没有技术
            </h3>
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title4">
              所以才可能创造新的技术
            </h3>
          </div>
          <div className="flex flex-col absolute justify-center items-center text-center h-full w-auto leading-tight panel">
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title5">
              我们是草履虫
            </h3>
            <h3 className="~text-2xl/4xl font-bold mb-4 text-primary-content about-us-title6">
              所以我们有无限的可能性
            </h3>
          </div>
          {/* 这里就是一堆卡片子 */}
          <>
            {totalProfiles &&
              totalProfiles.map((profile, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-fit bg-base-100 p-4 rounded-md absolute opacity-0 people-panel"
                  >
                    <div className="">
                      <img
                        src={profile.face}
                        className="w-20 h-20 rounded-full"
                      ></img>
                    </div>
                    <div className="text-start ml-4">
                      <h1 className="text-xl font-bold">{profile.name}</h1>
                      <h2 className="text-sm">{profile.mid}</h2>
                    </div>
                  </div>
                );
              })}
          </>
          <div className="flex flex-col absolute justify-center items-center">
            <a
              href="https://www.bilibili.com/video/BV1Tp4y1m7Zs"
              className="btn btn-outline w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP-001
            </a>
            <a
              href="https://www.bilibili.com/video/BV1UTWxeqEEb"
              className="btn btn-outline w-full md:w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP-002
            </a>
            <a
              href="https://www.bilibili.com/video/BV1N8t4ejEp6/"
              className="btn btn-outline w-full md:w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP-003
            </a>
          </div>
        </div>

        <div className="w-full h-screen flex md:flex-row flex-col justify-between bg-black overflow-x-hidden">
          <div className="flex flex-col absolute h-screen w-[99%] leading-none z-0 ntp-02-preview-bg-container overflow-hidden">
            <div className="flex flex-col w-[99%] whitespace-nowrap ntp-02-preview-bg-content">
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
              <h1 className="text-[18rem] lg:text-[20rem] overflow-hidden font-bold mb-2 ml-2 text-white/10 z-0 ntp-02-preview-bg-title">
                NTP-004NTP-004
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center mx-10 md:mx-10 h-full leading-tight overflow-hidden relative w-full">
            <div className="z-20">
              <h2 className="text-[7rem] font-bold mb-4 leading-none ~text-6xl/8xl z-10 ntp-02-preview">
                <span>TECH BOOT UP！</span>
                <span className="text-primary zero-two-title z-10 absolute">
                  02
                </span>
              </h2>

              <h2 className="text-4xl font-bold ml-1 z-10 ntp-02-preview">
                即将发布
              </h2>
              <a
                href="https://www.bilibili.com/video/BV1i4wkeGEwH"
                className="btn btn-outline btn-primary w-[80%] md:w-48 mt-6 border-2 rounded-full hover:border-none z-10 ntp-02-preview-btn"
              >
                VIEW PREVIEW
              </a>
            </div>

            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=113855875253582&bvid=BV1i4wkeGEwH&cid=27980992029&p=1&autoplay=0"
              scrolling="no"
              className="absolute hidden md:block md:w-1/2 md:h-1/2 md:bottom-auto md:right-10 z-10 opacity-70 hover:opacity-100 ntp-02-video"
              border="0"
              frameborder="no"
              autoPlay="false"
              framespacing="0"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>

        <div className="w-full h-screen flex bg-black">
          <div class="bg-primary pointer-events-none absolute start-20 aspect-square w-96 rounded-full opacity-20 blur-3xl [transform:translate3d(0,0,0)]"></div>
          <div class="bg-success pointer-events-none absolute aspect-square w-[40rem] rounded-full opacity-10 blur-3xl end-0"></div>
          <div className="flex flex-col w-full items-center justify-center text-center">
            <div class="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl [transform:translate3d(0,0,0)]"></div>
            <h1 className="~text-5xl/6xl font-bold mb-4 leading-none text-white">
              NULLTECH SHOWCASE
            </h1>
            <h1 className="~text-2xl/3xl font-bold mb-4 leading-none text-white/80">
              哇多么好的9min HITECH盛宴
            </h1>
            <a
              href="https://www.bilibili.com/video/BV1i4wkeGEwH"
              className="btn btn-outline w-[80%] md:w-48 mb-2 border-2 rounded-full hover:border-none z-10 ntp-02-preview-btn"
            >
              VIEW ON BILIBILI
            </a>
            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=112994398831463&bvid=BV1UTWxeqEEb&cid=500001656039874&p=1&autoplay=0"
              scrolling="no"
              className="w-1/3 h-1/3"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
              autoPlay="false"
            ></iframe>
          </div>
        </div>

        <div className="w-full h-screen flex bg-black overflow-hidden">
          <div className="flex flex-col w-full items-center justify-center text-center overflow-hidden relative">
            <div class="bg-warning pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl [transform:translate3d(0,0,0)]"></div>
            <h1 className="~text-5xl/6xl font-bold mb-4 leading-none text-white">
              FOLLOW US
            </h1>
            <h1 className="~text-2xl/3xl font-bold mx-2 mb-4 leading-none text-white/80">
              在社交媒体上关注我们，以查看最新动态
            </h1>
            <a
              href="https://space.bilibili.com/3546388319177513"
              className="btn btn-outline w-[80%] md:w-48 my-2 border-2 rounded-full hover:border-none z-10 ntp-02-preview-btn"
            >
              BILIBILI
            </a>
            <a
              href="https://x.com/NT_PARAMECIUM"
              className="btn btn-outline w-[80%] md:w-48 my-2 border-2 rounded-full hover:border-none z-10 ntp-02-preview-btn"
            >
              TWITTER
            </a>
            <a
              href="https://www.youtube.com/@NULLTECH_PARAMECIUM"
              className="btn btn-outline w-[80%] md:w-48 my-2 border-2 rounded-full hover:border-none z-10 ntp-02-preview-btn"
            >
              YOUTUBE
            </a>
          </div>
        </div>

        <footer className="footer bg-neutral text-neutral-content p-10 relative overflow-hidden">
          <div class="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl [transform:translate3d(0,0,0)]"></div>
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              NULLTECH PARAMECIUM ORG.
              <br />
              WE ARE PARAMECIUM.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a href="https://x.com/NT_PARAMECIUM">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/@NULLTECH_PARAMECIUM">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="https://space.bilibili.com/3546388319177513">
                <svg
                  t="1737987459991"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4192"
                  width="25"
                  height="25"
                  className="fill-current"
                >
                  <path d="M257.2 111.1c15.8-9.02 35.9-10.28 52.6-2.9 12.52 5.14 21.94 15.22 32.12 23.78 42 36.24 83.64 72.94 125.82 108.96 29.5 0.06 59.02 0.06 88.52 0 42.16-36 83.76-72.66 125.74-108.9 10.2-8.56 19.64-18.66 32.2-23.84 16.24-7.16 35.72-6.2 51.32 2.22 18.24 9.42 30.9 28.94 31.68 49.5 1.18 14.94-4.18 30.02-13.56 41.6-8.3 9.2-18.18 16.72-27.38 24.96-5.88 4.86-11.16 10.46-17.64 14.56 26.02 0 52.04-0.3 78.06 0.16 34.28 0.9 67.64 16.06 91.22 40.9 24.9 24.44 39.1 58.94 39.08 93.8 0.12 119.36 0.02 238.74 0.06 358.12-0.12 18.04 0.86 36.34-3.14 54.08-7.3 36.32-31.68 67.78-62.68 87.32-21.16 13.42-46.34 19.56-71.26 19.6-189.98 0.02-379.98 0-569.96 0-18.74-0.12-37.7 0.98-56.14-3.14-35.32-7.1-66.06-30.4-85.7-60.16C83.74 810.06 76.98 783.9 76.98 758c-0.02-117.98 0-235.96 0-353.94 0.16-18.14-0.96-36.48 2.74-54.36 11.22-58.22 64.86-105.76 124.38-108.34 27.1-0.84 54.24-0.22 81.36-0.32-12.76-9.26-24.02-20.44-36.1-30.56-14.82-12.14-24.1-31.28-22.56-50.56 0.78-20.06 12.84-39.18 30.4-48.82m-14.32 244.14c-23.08 4.14-42.86 22.36-49.3 44.84-2.32 7.72-2.54 15.88-2.58 23.9 0.1 98.02-0.06 196.04 0.08 294.06-0.46 26.68 17.94 51.94 43.06 60.44 8.92 3.26 18.56 3.3 27.92 3.36 168.66-0.08 337.3 0.08 505.94-0.06 24.72 1 48.52-14.4 58.92-36.6 6.36-12.72 6.28-27.24 6.06-41.1-0.02-91.32-0.02-182.64 0-273.94-0.02-10.04 0.34-20.34-2.58-30.06-5.6-19.58-21.3-35.92-40.54-42.54-10.8-3.9-22.48-3.3-33.76-3.38-161.32 0.02-322.62 0-483.94 0.02-9.76 0.02-19.58-0.34-29.28 1.06z"></path>
                  <path d="M345.04 449.44c16.12-1.66 32.84 3.56 45.14 14.1 13.68 11.22 21.5 28.72 21.72 46.32 0.44 21.38 0.16 42.8 0.16 64.18-0.06 14.04-3.76 28.36-12.48 39.56-12.12 16.44-33.02 25.82-53.36 23.94-20.06-1.26-38.92-13.5-48.46-31.14-7.48-12.8-8.14-28.02-7.94-42.46 0.48-20.74-1.04-41.6 1.02-62.28 3.08-27.22 26.98-49.94 54.2-52.22z m321.9 0c16.7-1.74 33.98 3.92 46.48 15.1 12.32 10.84 19.84 26.88 20.34 43.28 0.94 20.04 0.12 40.12 0.44 60.16 0.12 14.08-1.54 28.78-9.36 40.86-11.28 18.78-33.34 30.34-55.2 28.8-19.14-0.78-37.42-11.48-47.72-27.58-8.74-12.9-10.44-28.88-10.06-44.08 0.4-20.62-0.74-41.26 0.68-61.84 2.04-28.16 26.34-52.32 54.4-54.7z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default Homepage;
