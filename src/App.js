import logo from './logo.svg';
import './App.css';
// import { useLocation } from 'react-router-dom';
import Overlay from './components/Overlay';
import {Canvas,useLoader,useFrame,extend} from '@react-three/fiber'
import { Environment, OrbitControls, Sphere,shaderMaterial,PerspectiveCamera} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef, useState } from 'react';
import glsl from "babel-plugin-glsl/macro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as THREE from 'three'
import './index.css';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { useThree } from '@react-three/fiber';
import { easing } from 'maath';
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
import Page from './components/Page';

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 2.0;
      float noiseAmp = 0.02;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

    void main() {
      float wave = vWave * 0.1;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

let mainPositions = {
  "chatbot": new THREE.Vector3(90,  8,  100),
 "smart-mirror": new THREE.Vector3(0,  -25, -100),
 "digital-face":new THREE.Vector3(-50,  -15,  100),
}

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "/grid.png",
  ]);

  return (
    <mesh scale={2000} rotation={[-Math.PI/2,0,0]} position={[0,-240,0]}>
      <planeGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={"white"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Model = ({ model, scale, position = [0, 0, 0], cubeTextures,rotation = [0,0,0],name ,start = false}) => {
  
  const gltf = useLoader(GLTFLoader, model);
  const modelRef = useRef();
  const [oldPos,setOldPos] = useState()


  useEffect(()=>{
    console.log(name,modelRef.current.position)
  },[modelRef])
  const mixer = useRef();
  const actions = useRef([]);

  if (gltf.animations.length && !mixer.current) {
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    actions.current = gltf.animations.map((clip) => mixer.current.clipAction(clip));
    actions.current[0].play();
  }


  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  useEffect(() => {
    if (gltf.scene && cubeTextures) {
      const cubeTextureLoader = new THREE.CubeTextureLoader();
      const envMap = cubeTextureLoader.load(cubeTextures);
    }
  }, [gltf.scene, cubeTextures]);
  let bro = true
  useFrame((state,dt)=>{
    if(name==='smart-mirror'&&start)
    easing.damp3(modelRef.current.position,new THREE.Vector3(100,-30,-70), 0.4, dt)
    else if(name==='smart-mirror'&&!start)
    easing.damp3(modelRef.current.position,mainPositions[name], 0.4, dt)

     if(name==='chatbot'&&start)
    easing.damp3(modelRef.current.position,new THREE.Vector3(100,-10,200), 0.4, dt)
    if(name==='chatbot'&&!start)
    easing.damp3(modelRef.current.position,mainPositions[name], 0.4, dt)

    if(name==='digital-face'&&start)
    easing.damp3(modelRef.current.position,new THREE.Vector3(-40,-10,-1), 0.4, dt)
    if(name==='digital-face'&&!start)
    easing.damp3(modelRef.current.position,mainPositions[name], 0.4, dt)

  },[start])
  return (
    <primitive
      ref={(node) => {
        modelRef.current = node;
      }}
      scale={scale}
      name={name??name}
      object={gltf.scene}
      rotation={rotation}
      position={position}
    />
  );
};


// function SkyBox() {
//   const { scene } = useThree();
//   const loader = new CubeTextureLoader();
//   // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
//   const texture = loader.load([
//     '/env/px.png',
//     '/env/nx.png',
//     '/env/py.png',
//     '/env/ny.png',
//     '/env/pz.png',
//     '/env/nz.png',
//   ]);

//   // Set the scene background property to the resulting texture.
//   scene.background = texture;
//   return null;
// }
// const GOLDENRATIO = 1.61803398875
let positions = {
  'chatbot':new THREE.Vector3(
    3.5446462023414824,
    29.44424819277169,
    145.18908409214386),
  'smart-mirror':new THREE.Vector3(
    50.526629548931174,
    25.265019734407502,
    -3.348120388613752),
  'digital-face':new THREE.Vector3(
    42.20715545964656
    ,25.36578388018235,
    66.5397507012125
  ),
}
let rotations = {
  'chatbot':new THREE.Quaternion(-0.04641168132562546,-0.7013847570035338,-0.04586207076858502,0.7097901442993131),
  'smart-mirror':new THREE.Quaternion(-0.07096086965497969,-0.046080186132859816,-0.00328167539043924,0.9964087524858468),
  'digital-face':new THREE.Quaternion(0.015809010596411176,0.67106680040187,-0.014315266836331688,0.7410900739571162),
}


let CameraRig = ({element})=>{
  const [intro,setIntro] = useState(true)
  let camintro  = {}
  camintro.position = new THREE.Vector3(28.634077955275224,45.77921122368897,254.70734297889712)
  camintro.rotation = new THREE.Quaternion(-0.08512212192370375,0.046028323704178795,0.003936534185846143,0.9952990110890259)
  useEffect(()=>{
    setTimeout(() => {
      setIntro(false)
    }, 500);
  },[])
  useFrame((state, dt) => {
    // console.log(state.camera)
    easing.damp3(state.camera.position,intro?camintro.position: positions[element], 0.4, dt)
    easing.dampQ(state.camera.quaternion,intro?camintro.rotation: rotations[element], 0.4, dt)
  })
  return(<>
   {/* <PerspectiveCamera position={[0, 0, 0]} /> */}
  </>)
}

const Elements = ['smart-mirror','chatbot','digital-face']
function App() {
  let [counter,setCounter] = useState(0)
  // let counter = 0
  const [start,setStart] = useState(false)
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Overlay start={start} setStart={setStart} setCounter={setCounter} counter={counter}/>}></Route>
            <Route path="/test" element={<Page start={start} setStart={setStart} />}></Route>
          </Routes>
       </BrowserRouter>
      {/* <Page/> */}
      <Canvas style={{width:'100vw',height:'100vh'}}>
        <CameraRig element={Elements[counter]}/>
        <Wave/>
          <color attach={'background'} args={['black']} />
          <Model model={'/models/chatbot.glb'} start={start} name={'chatbot'} scale={0.5}  rotation={[0,Math.PI/2,0]} position={[90, 8, 100]} />
          <Model model={'/models/smart-mirror.glb'} start={start} name={'smart-mirror'} scale={0.1} rotation={[0,0,0]} position={[0, -25, -100]} />
          <Model model={'/models/digital-double.glb'} start={start} name={'digital-face'} scale={0.1} rotation={[0,Math.PI/2,0]} position={[-50, -15, 100]} />
          <mesh scale={120} position={[0,0,-10]}>
              <boxGeometry args={[10,10,10]}/>
              <meshStandardMaterial side={THREE.DoubleSide} color={'black'}/>
          </mesh>
          {/* <OrbitControls/> */}
          <Environment
            files={[
              '/env/px.png',
              '/env/nx.png',
              '/env/py.png',
              '/env/ny.png',
              '/env/pz.png',
              '/env/nz.png',
            ]}
            background
      />
          <ambientLight color={'purple'} intensity={10}/>
          <ambientLight color={'white'} intensity={0.5}/>
          
        {/* <EffectComposer> */}
        {/* <DepthOfField focusDistance={0} focalLength={0.002} bokehScale={0.2} height={20} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={400} /> */}
        {/* <Noise opacity={0.02} /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={1} /> */}
      {/* </EffectComposer> */}
      </Canvas>
    </div>
  );
}

export default App;
