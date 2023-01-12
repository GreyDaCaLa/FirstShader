import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ShowAll } from "./comp/Basic/ShowAll";
import { MiddleMan } from "./comp/WithThumnails/MiddleMan";

function App() {

  let showThumnails = false
  function initialObjects() {


    let allitems = {
      b1: { color: "red", dg: 0 },
      b2: { color: "yellow", dg: 90 },
      b3: { color: "blue", dg: 180 },
      b4: { color: "white", dg: 270 },
    };





    function basic(){
      return(
        <Canvas camera={{ position: [10, 3, 0] }}>
        <ambientLight intensity={0.5} />
        {/* <ClickWatch /> */}

        <Physics>
          <Debug color="red" scale={1}>
            <ShowAll allitems={allitems} />
          </Debug>
        </Physics>

        <OrbitControls />
        <axesHelper name={"axesHelper"} scale={10} />
      </Canvas>
      )
    }

    function WithThumnails(){
      return(<MiddleMan /> )
    }

    return (

      showThumnails?WithThumnails():basic()

    );
  }

  return initialObjects();
}

export default App;
