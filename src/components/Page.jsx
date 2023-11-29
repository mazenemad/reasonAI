import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate,useLocation } from "react-router-dom";
let Page = ({image1,image2,text1,text2,setStart,start})=>{
    let {pathname} = useLocation()
    console.log(pathname)

    useEffect(()=>{
        if(pathname === '/test')
        setStart(true)
        else
        setStart(false)

        console.log(pathname,start+'s','over')

    },[start])
    let style = `
    .mainPage{
        .mainPage {
            transition: opacity 0.7s ease; /* Define transition properties */
          }
          .animate {
            opacity: 0;
          }
    }
    `
    return(<>
    <style>{style}</style>
        <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 1.5,delay:1 }}
        className={`mainPage absolute z-30 left-0 top-0 h-screen w-scree overflow-x-hidden py-16`}>
            <div className="mt-48 ml-48">
                <h1 className="text-white text-left tracking-widest leading-3 text-2xl">MIRROR MATE</h1>
                <p className="text-white text-left w-[400px] text-[hsla(0,0%,99.2%,.75)] text-xl mt-6">Stay up-to-date with your schedule, catch up on news, weather, and more, all while you get ready. Get personalized recommendations and track your fitness goals. Upgrade your routine and experience the power of our Mirror Mate today.</p>
            </div>
            <div className="h-[340px]"></div>
            <div className="w-full flex flex-col justify-center items-center mb-[200px]">
                <p className="text-white w-full px-[10%] tracking-widest leading-10 text-left text-xl">UPGRADE YOUR DAILY ROUTINE WITH OUR MIRROR MATE - YOUR ALL-IN-ONE PERSONAL ASSISTANT. POWERED BY ADVANCED AI TECHNOLOGY, VOICE/GESTURE CONTROLS, FITNESS TRACKING, PERSONALIZED RECOMMENDATIONS SMART HOME INTEGRATION, CAMERA, SPEAKERS, AND ANTI-FOG TECH, IT'S THE PERFECT ADDITION TO ANY MODERN SPACE.</p>
            </div>
            <div className="flex flex-row px-16">
                <img className={'w-[50%]'} src="/photo1.webp"/>
                <h1 className="text-white tracking-widest leading-8 w-[500px] ml-[-50px] z-10">The Smart Mirror is a cutting-edge device that uses advanced AI technology to provide a personalized and immersive experience. The Smart Mirror can be used for a variety of purposes, such as checking the weather, reading the news, and controlling smart home devices.
                    The device also features voice recognition technology, allowing you to interact with it hands-free. With its sleek and modern design, the Smart Mirror seamlessly integrates into any room, enhancing the aesthetic of your space.</h1>
            </div>
            <div className="mt-[150px]">
    <h1>SPECIFICATIONS</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center items-center content-center">
        <div className="p-2 text-white w-[200px]">
                <h1>HIGH-RES DISPLAY</h1>
                <p>The Smart Mirror features a high-resolution display that provides stunning clarity and vibrant colors.</p>
            </div>
            <div className="p-2 text-white w-[200px]">
                <h1>HIGH-RES DISPLAY</h1>
                <p>The Smart Mirror features a high-resolution display that provides stunning clarity and vibrant colors.</p>
            </div>
            <div className="p-2 text-white w-[200px]">
                <h1>HIGH-RES DISPLAY</h1>
                <p>The Smart Mirror features a high-resolution display that provides stunning clarity and vibrant colors.</p>
            </div>
            <div className="p-2 text-white w-[200px]">
                <h1>HIGH-RES DISPLAY</h1>
                <p>The Smart Mirror features a high-resolution display that provides stunning clarity and vibrant colors.</p>
            </div>
        </div>
    </div>

            <div className="flex flex-row-reverse px-16 mt-[200px]">
                <img className={'w-[50%]'} src="/photo2.webp"/>
                <h1 className="text-white tracking-widest leading-8 w-[500px] mr-[-50px] z-10">The Smart Mirror is a cutting-edge device that uses advanced AI technology to provide a personalized and immersive experience. The Smart Mirror can be used for a variety of purposes, such as checking the weather, reading the news, and controlling smart home devices.
                    The device also features voice recognition technology, allowing you to interact with it hands-free. With its sleek and modern design, the Smart Mirror seamlessly integrates into any room, enhancing the aesthetic of your space.</h1>
            </div>
        </motion.div>
    </>)
}

export default Page