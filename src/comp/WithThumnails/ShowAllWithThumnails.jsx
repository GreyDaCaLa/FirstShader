import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { FlySheet } from "./FlySheet"



export const ShowAllWithThumnails = ({ allItems,setAllItems,currDG,moveToDG}) => {
    console.log('showall re render')
    const allcolors = ['red','lightgreen','yellow','blue','cyan','pink','white','orange','lightblue']
    // const [arr,setArr] = useState(allitems)



    function handleClick(e,ind){
        // let smallthing = document.getElementById('thumnail1');
        // smallthing.className = 'simpleblockgreg greggreen'
        if(e.which == 1){
            console.log('wassup',ind)
            let ot = allItems[ind].dg
            console.log(ot)
            moveToDG.current=ot
        }

        if(e.which == 3){
            let newAllItems = {...allItems}
            let newkeys = Object.keys(newAllItems)
            newkeys.push('b'+(newkeys.length+1))
            // console.log(newkeys)

            newkeys.forEach((ele,ind)=>{
                let obj = {}
                obj['color']=allcolors[ind%10]
                obj['dg']= Math.floor(360/newkeys.length)*(ind)
                newAllItems[ele]=obj
            })
            setAllItems(newAllItems)


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
        {Object.keys(allItems).map((ele,ind,full)=>{
            return(

                <FlySheet dg={allItems[ele].dg} color={allItems[ele].color}  key={`blockkey${ele}`} ind={ele} clickfunc={handleClick} currDG={currDG} moveToDG={moveToDG}  />
            )
        })}
        </>
    )
}