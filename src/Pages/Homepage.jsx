import React, { Component } from 'react';
import Spline from '@splinetool/react-spline';

class Homepage extends Component {
    render() {
        return (
            <div data-theme="dark">
                <div className="navbar bg-base-100 fixed opacity-80 backdrop-blur-lg">
                    <div className="flex-1">
                        <img src='ntp2024_logo.svg' className="btn btn-ghost text-xl w-32"></img>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><a>Dizzylab</a></li>
                            <li>
                                <details>
                                    <summary>Event</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><a>Link 1</a></li>
                                        <li><a>Link 2</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='w-full h-screen flex md:flex-row flex-col justify-between bg-black overflow-hidden'>
                    <div className="flex flex-col justify-center ml-10 h-full w-auto leading-tight z-10">
                        <h1 className='text-2xl font-bold mb-2 ~ml-1/2'>无技术草履虫</h1>
                        <h2 className='text-[7rem] font-bold mb-4 leading-none ~text-6xl/8xl'>NULLTECH</h2>
                        <h2 className='text-4xl font-bold ~ml-1/2'>PARAMECIUM</h2>
                    </div>
                    <div className="flex-col justify-center h-full w-auto absolute opacity-50 md:block md:relative md:opacity-100">
                        <Spline scene="https://prod.spline.design/T2YezWy8vr3x1qE8/scene.splinecode" />
                    </div>
                </div>
                <div className='w-full h-screen flex md:flex-row flex-col justify-between bg-black overflow-x-hidden'>
                    <div className="flex flex-col justify-center ml-10 h-full w-auto leading-tight ">
                        <h2 className='text-[7rem] font-bold mb-4 leading-none ~text-6xl/8xl'>NULLTECH</h2>
                        <h1 className='text-2xl font-bold mb-2'>一群草履虫的快乐创新社团</h1>
                        <h2 className='text-4xl font-bold'>PARAMECIUM</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;
