import { useRef } from "react"
import { extend, useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro"


const WaveShaderMaterialFlySheet = shaderMaterial(
    //Uniform
    {
        uTime: 0,
        uColor: new THREE.Color(1.0,0.0,0.0),
    },
    //vertex shader
    glsl`
        precision mediump float;

        varying vec3 pos;
        varying vec2 vUv;
        uniform float uTime;
        
        #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

        void main() {
            vUv = uv;
            pos = position;
            float noiseFreq= 10.0;
            float noiseAmp =.05;

            // vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
            // pos.z += snoise3(noisePos) * noiseAmp;
            // pos.z += sin((pos.x + uTime)*8.0)/4.0; //horizontal wave
            pos.z += sin((pos.x+pos.y + uTime)*4.0)/4.0; //horizontal wave
            if(pos.z<=0.0){
                pos.z=0.0;
            }
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,   1.0);
        }
    `,
    //fragment shader
    glsl`
        precision mediump float;
        uniform vec3 uColor;
        varying vec3 pos;
        uniform float uTime;


        void main() {
            gl_FragColor =vec4( uColor -pos.z*2.0    ,1.0 );
        }
    `
)

extend({WaveShaderMaterialFlySheet})

export const FlySheet = ({ dg, radius=4, myargs=[1,1,16,16], ind,clickfunc , color, currDG }) => {
    console.log('---------flySheet rerender')

    const mRef = useRef()

    useFrame(({clock})=>{
        if(mRef.current){

            let x=radius *Math.cos( (dg+currDG.current)*Math.PI/180)
            let z=radius *Math.sin( (dg+currDG.current)*Math.PI/180)
            // api.position.set(x,0,z)
            mRef.current.position.x=x
            mRef.current.position.z=z
            
            mRef.current.material.uTime = clock.getElapsedTime()
        }


    })

    return (
        <mesh ref={mRef} name={'flySheet'} rotation={[0,90*Math.PI/180,0]} onClick={(e)=>{clickfunc(e,ind)}} onContextMenu={(e)=>{clickfunc(e,ind)}} >
            <planeGeometry attach="geometry" args={myargs}/>
            <waveShaderMaterialFlySheet
            uColor={color} 
            />
        </mesh>
    )
}