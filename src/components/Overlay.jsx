import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

// useState
let Element = [
    {h1:'MIRROR MATE',p:'Introducing our revolutionary Smart Mirror - your all-in-one personal assistant for the day ahead. Stay up-to-date with your schedule, catch up on news, weather, and more, all while you get ready.',
    button:'ENTER'},
    {h1:'CHATTY BOT',p:'Say hello to our intelligent Chatbot - your virtual assistant that understands you. Get quick answers, recommendations, and assistance with just a few messages powered by advanced AI technology.',
    button:'ENTER'},
    {h1:'AVATAR MIND',p:'Experience the future of virtual presence with our AI-powered Avatar. Create a customizable digital twin and interact with the world on your own terms. See the possibilities today.',
    button:'ENTER'},
]

let Overlay = ({setCounter,counter,start,setStart})=>{
    let {pathname} = useLocation()
    console.log(pathname,'over')
    useEffect(()=>{
        if(pathname === '/test')
        setStart(true)
        else
        setStart(false)

        console.log(pathname,start,'over')
    },[start])
    const [animate, setAnimate] = useState(false);
    const [currentText,setCurrentText] = useState(Element[counter])
    const handleClick = () => {
        setAnimate(true);
        setTimeout(() => {
           setCurrentText(Element[counter])
        }, 900);
        setTimeout(() => {
        setAnimate(false);
        }, 1000);
        };
    useEffect(()=>{
        handleClick()
    },[counter])
let style = `
.circle-button {
    transition: all 0.3s ease-in-out;
  }
  .circle-button:hover {
    border-radius: 9999px; /* Use a large value to form a circle */
  }
  .child{
    margin: 60vh auto 0;
    transform: translateY(-50%);
  }
  .button_slide {
    padding: 20px 45px;
    border: 1px solid #D80286 ;
    display: inline-block;
    position: relative;
    background: transparent;
    color: white;
  }
  .button_slide:before, .button_slide:after {
    height: 25px;
    width: 25px;
    background: black;
    position: absolute;
    content: '';
  }
  .button_slide:before {
    top: 0;
    left: 0;
    border-right: 1px solid #D80286;
    transform: rotate(49deg) translate(-71%);
  }
  .button_slide:after {
    bottom: 0;
    right: 0;
    border-left: 1px solid #D80286;
    transform: rotate(49deg) translate(71%);
  }

  .button_slide {
    color: #FFF;
    border: 2px solid rgb(216, 2, 134);
    border-radius: 0px;
    padding: 18px 36px;
    display: inline-block;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: inset 0 0 0 0 #D80286;
    -webkit-transition: ease-out 0.4s;
    -moz-transition: ease-out 0.4s;
    transition: ease-out 0.4s;
  }

  .slide_down:hover {
    box-shadow: inset 0 100px 0 0 #D80286;
  }
  body{
    font-family: "Oxygen",sans-serif;
  }
  .box {
    transition: opacity 0.7s ease; /* Define transition properties */
  }
  
  /* Define the animation when the 'animate' class is applied */
  .animate {
    opacity: 0;
  }
`
const nav = useNavigate()
    return(<>
        <style>{style}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div className=" select-none z-20 absolute left-0 top-0 h-screen w-screen">
            <img width={160} className="ml-10 mt-10" src="/logo.png"/>
            <div className={`absolute right-[10%] top-[34%] flex flex-col w-[400px] justify-left content-left items-left gap-5 box ${animate ? 'animate' : ''}`}>
                <h1 className="text-4xl text-white text-left tracking-widest">{currentText.h1}</h1>
                <p className="text-slate-400 w-[300px] text-left text-lg">{currentText.p}</p>
                <button
                
                className="button_slide slide_down w-[150px] text-center" onClick={()=>{
                    nav('/test')
                    setStart(true)
                }}>ENTER</button>
            </div>
            <div className=" absolute top-0 child w-full flex flex-row justify-between px-16">
                    <button onClick={()=>{
                        if(counter>0)
                        setCounter(counter-1)
                        else
                        setCounter(2)
                        }} class="circle-button flex items-center justify-center rounded-full w-14 h-14  border-2 border-purple-700 hover:bg-purple-600 hover:border-purple-700 focus:outline-none">
                                <span class="material-symbols-outlined text-white">
                        chevron_left
                        </span>
                    </button>
                    <button onClick={()=>{
                        if(counter <2)
                        setCounter(counter+1)
                        else
                        setCounter(0)
                        }} class="circle-button flex items-center justify-center rounded-full w-14 h-14  border-2 border-purple-700 hover:bg-purple-600 hover:border-purple-700 focus:outline-none">
                                <span class="material-symbols-outlined text-white">
                        chevron_right
                        </span>
                    </button>

            </div>
        </div>
        
    </>)
}

export default Overlay