
import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ShowAllWithThumnails } from "./ShowAllWithThumnails";
import { useRef, useState } from "react";




export const MiddleMan = ()=>{

    const currDG = useRef(0)
    const moveToDG= useRef(0)
    const [allItems,setAllItems] =useState({
        b1: { color: "red", dg: 0 },
        b2: { color: "yellow", dg: 90 },
        b3: { color: "blue", dg: 180 },
        b4: { color: "white", dg: 270 },
    })


    // let allitems = {
    //     b1: { color: "red", dg: 0 },
    //     b2: { color: "yellow", dg: 90 },
    //     b3: { color: "blue", dg: 180 },
    //     b4: { color: "white", dg: 270 },
    //   };

      
    // function modAllItems(data) {
    //     allitems = data;
    //   }


    function displaythumnails() {
        return (
          <div id="thumnailALL" className="sb-cont">
            {Object.keys(allItems).map((ele, ind, full) => {
              return (
                <div
                  id={`thumnail-${ind + 1}`}
                  className="sb-item"
                  key={`thumnailkey-${ind + 1}`}
                  style={{ backgroundColor: `${allItems[ele].color}` }}
                  onClick={()=>{
                    moveToDG.current=allItems[ele].dg
                    console.log(moveToDG.current)
                  }}
                >
                  yes
                </div>
              );
            })}
          </div>
        );
      }



    return(
        <>
        {displaythumnails()}
          <Canvas camera={{ position: [10, 3, 0] }}>
          <ambientLight intensity={0.5} />
  
          <Physics>
            <Debug color="red" scale={1}>
              <ShowAllWithThumnails allItems={allItems} setAllItems={setAllItems} currDG={currDG} moveToDG={moveToDG} />
            </Debug>
          </Physics>
  
          {/* <OrbitControls /> */}
          <axesHelper name={"axesHelper"} scale={10} />
        </Canvas>
        </>
    )
}