import React, { Component } from 'react';
import Spline from '@splinetool/react-spline';

class Homepage extends Component {
    render() {
        return (
            <div data-theme="dark">
                <div className='w-full h-screen flex md:flex-row flex-col justify-between bg-black'>
                    <div className="flex flex-col justify-center ml-10 h-full w-auto leading-tight ">
                        <h1 className='text-2xl font-bold mb-2'>无技术草履虫</h1>
                        <h2 className='text-[7rem] font-bold mb-4 leading-none'>NULLTECH</h2>
                        <h2 className='text-4xl font-bold'>PARAMECIUM</h2>
                    </div>
                    <div className="flex flex-col justify-center h-full w-auto">
                    <Spline scene="https://prod.spline.design/T2YezWy8vr3x1qE8/scene.splinecode" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;