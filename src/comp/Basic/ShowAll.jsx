import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { FlyBlock } from "./FlyBlock"
import { FlyPaper } from "./FlyPaper"


export const ShowAll = ({ allitems}) => {
    console.log('showall re render')
    const allcolors = ['red','green','yellow','blue','purple','white','pink','orange','lightblue']
    const [arr,setArr] = useState(allitems)
    const currDG = useRef(0)
    const moveToDG= useRef(0)


    function handleClick(e,ind){
        let smallthing = document.getElementById('thumnail1');
        smallthing.className = 'simpleblockgreg greggreen'
        if(e.which == 1){
            console.log('wassup',ind)
            let ot = arr[ind].dg
            console.log(ot)
            moveToDG.current=ot
        }

        if(e.which == 3){
            let newarr = {...arr}
            let newkeys = Object.keys(newarr)
            newkeys.push('b'+(newkeys.length+1))
            // console.log(newkeys)

            newkeys.forEach((ele,ind)=>{
                let obj = {}
                obj['color']=allcolors[ind%10]
                obj['dg']= Math.floor(360/newkeys.length)*(ind)
                newarr[ele]=obj
            })
            // console.log(newarr)
            setArr(newarr)


        }

        
    }

    useFrame(()=>{

        let mt = moveToDG.current
        let cr = currDG.current%360
        let smalldiff  = Math.abs(Math.abs( mt)-Math.abs(cr))
        // console.log(cr,mt, smalldiff)
        let growby = 1
        if(smalldiff <=2){
            currDG.current=-1*moveToDG.current
            cr=1*moveToDG.current
        }
        // if(smalldiff>180){
        //     growby=5
        // }
        // if(smalldiff<180){
        //     growby=1
        // }
        if(mt != cr){
            if(mt>cr){
                currDG.current -=growby
            }else{
                currDG.current +=growby
            }
        }


    })

    return (
        <>
        {Object.keys(arr).map((ele,ind,full)=>{
            return(
                // <FlyBlock dg={arr[ele].dg} color={arr[ele].color}  key={`blockkey${ele}`} ind={ele} clickfunc={handleClick} currDG={currDG} moveToDG={moveToDG}  />
                <FlyPaper dg={arr[ele].dg} color={arr[ele].color}  key={`blockkey${ele}`} ind={ele} clickfunc={handleClick} currDG={currDG} moveToDG={moveToDG}  />
            )
        })}
        </>
    )
}