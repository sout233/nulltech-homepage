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
      gsap.from(".ablum-overlook-title",{
        scrollTrigger: {
          trigger: ".ablum-overlook-title",
          toggleActions: "play none none reverse",
        }
        ,
        text:"NULLTECH",
        fontSize: "6rem",
        duration: 1,
        opacity: 0,
        ease: "power2.in",
      })
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
        end: "+=150%",
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
    tl.to(".about-us-title3", {
      x: "-50vw",
      duration: 4,
      opacity: 0,
      text: "NULL",
    },"+=5");
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
        x: "70vw",
        opacity: 1,
        duration: 10,
        stagger: 2,
      },
      {
        x: "-70vw",
        opacity: 0.6,
        duration: 10,
        stagger: 2,
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
        text: "你是一个一个啊啊",
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

    tl.to(".about-us-title5",{
      text: "访问虫社官方账号",
      fontSize: "2rem",
      y: -200,
      duration: 2,
    })

    tl.to(".about-us-title6",{
      text: "查看所有参专人员",
      fontSize: "1.5rem",
      y: -200,
      duration: 2,
    },"-=2")

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
          className="w-full h-screen flex md:flex-row flex-col justify-center items-center overflow-x-hidden bg-black grid-bg"
        >
          <div className="flex flex-col justify-center items-center text-center h-full w-auto leading-tight ">
            <h2 className="text-[7rem] font-extrabold mb-4leading-none ~text-4xl/6xl text-white ablum-overlook-title">
              专辑一览
            </h2>
            <div className="h-10"></div>
            <div className="flex flex-row justify-center items-center space-x-10">
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
              你说的对
            </h3>
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title4">
              但是NULLTECH是一个由那啥创建的那啥社团
            </h3>
          </div>
          <div className="flex flex-col absolute justify-center items-center text-center h-full w-auto leading-tight panel">
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title5">
              在这个社团里
            </h3>
            <h3 className="~text-2xl/4xl font-bold mb-2 text-primary-content about-us-title6">
              你将扮演一名叫做草履虫的角色
            </h3>
          </div>
          <>
            <div className="flex flex-row justify-between items-center w-fit bg-base-100 p-4 rounded-md absolute people-panel">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-3xl">D</span>
                </div>
              </div>
              <div className="text-start ml-4">
                <h1 className="text-xl font-bold">草履虫</h1>
                <h2 className="text-sm">NULLTECH PARAMECIUM</h2>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-fit bg-base-100 p-4 rounded-md absolute people-panel">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-3xl">D</span>
                </div>
              </div>
              <div className="text-start ml-4">
                <h1 className="text-xl font-bold">草履虫</h1>
                <h2 className="text-sm">NULLTECH PARAMECIUM</h2>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-fit bg-base-100 p-4 rounded-md absolute people-panel">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-3xl">D</span>
                </div>
              </div>
              <div className="text-start ml-4">
                <h1 className="text-xl font-bold">草履虫</h1>
                <h2 className="text-sm">NULLTECH PARAMECIUM</h2>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-fit bg-base-100 p-4 rounded-md absolute people-panel">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-3xl">D</span>
                </div>
              </div>
              <div className="text-start ml-4">
                <h1 className="text-xl font-bold">草履虫</h1>
                <h2 className="text-sm">NULLTECH PARAMECIUM</h2>
              </div>
            </div>
          </>
          <div className="flex flex-col absolute justify-center items-center">
            <a
              href="https://www.dizzylab.net/l/NullTech_PARAMECIUM/"
              className="btn btn-outline w-full md:w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP1
            </a>
            <a
              href="https://www.dizzylab.net/l/NullTech_PARAMECIUM/"
              className="btn btn-outline w-full md:w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP1
            </a>
            <a
              href="https://www.dizzylab.net/l/NullTech_PARAMECIUM/"
              className="btn btn-outline w-full md:w-48 mt-6 border-black text-black border-2 rounded-full hover:border-none hover:bg-black hover:text-primary view-ntp-btn"
            >
              VIEW NTP1
            </a>
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
