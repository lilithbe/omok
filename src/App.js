import { useState } from "react";

import Board from "./components/Board";
import Dol from "./components/Dol";
import { defaultObject } from "./object";



function App() {
  const [omok, setOmok] = useState(defaultObject)
  const [tun, setTun] = useState(1)
  const [isStart, setIsStart] = useState(false)
  const [isVictory, setIsVictory] = useState(false)
  const [victoryDol, setVictoryDol] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [suSaveArray, setSuSaveArray] = useState([])
  const whiteWin= new RegExp(/1,1,1,1,1/gi)
  const blackWin =new RegExp(/2,2,2,2,2/gi)
  const whiteSix= new RegExp(/1,1,1,1,1,1/gi)
  const blackSix =new RegExp(/2,2,2,2,2,2/gi)


  const winerComplate = (win)=>{
    setVictoryDol(win)
    setIsVictory(true)
    setClickCount(0)
  }
  
  const getDol = (x,y) => { 
    if(x<0 || y <0){
      return false
    }else  if(x>20 || y >20){
      return false
    }else{
      return omok[x][y]
    }
   }
   const checkHandler =(_str)=>{
    const str = JSON.stringify(_str)
    if(str.match(whiteWin) && !str.match(whiteSix)){
      winerComplate(1)
    }else if(str.match(blackWin) && !str.match(blackSix)){
      winerComplate(2)
    }
   }
  return (
    <div>
      <h1>오목!</h1>
      <h3>{clickCount}</h3>

      <button onClick={(e)=>{
        e.preventDefault()
        setOmok(defaultObject)
        setIsVictory(false)
        setIsStart(true)
        
      }}>start</button>
      {isStart?  
      <button onClick={(e)=>{
        e.preventDefault()
        setIsVictory(false)
        setOmok(defaultObject)
        setClickCount(0)
      }}>reset</button>:null}

      <div className="row">
        <div className="col-4">
       
        </div>
        <div className="col-8">
        {isStart?
      <Board>
        {omok.map((row,x)=>{
          return (
            <div key={x} >
              {row.map((col,y)=>{
                return(<Dol key={y} isVictory={isVictory} currentDol={tun} dol={col} colickHandler={(e)=>{
                  e.preventDefault()
                  if (col === 0) {
                    const _col = Array.from(row)
                    const _row = Array.from(omok)
                    _col.splice(y, 1, tun)
                    _row.splice(x, 1, _col)
                    setOmok(_row)
                    setClickCount(clickCount + 1)
                    setTun(tun === 1 ? 2 : 1)
                    setSuSaveArray([...suSaveArray,{x:x,y:y}])
                    const rowArr=[]
                    for (let i = 0; i < omok.length; i++) {
                      if(i===x){
                        rowArr.push(tun)
                      }else{
                        rowArr.push(omok[i][y])
                      }
                    }
                 
                    const or=Array.from(row)
                    or.splice(y,1,tun)                              
                    const dr=[]
                    for (let i = -5; i <= 5; i++) {                
                      dr.push(i===0?tun:getDol(x+i,y+i))
                    }                    
                    const ur=[]
                    for (let i = -5; i <= 5; i++) {
                      ur.push(i===0?tun:getDol(x+i , y-i))
                    }
                    checkHandler(rowArr)
                    checkHandler(or)  
                    checkHandler(dr)
                    checkHandler(ur)
                  }
                }}/>)
              })}
            </div>
          )
        })}
      </Board>
      :null}
        </div>
      </div>

      <div className={`position-fixed ${isVictory?'d-block':'d-none'}`} style={{top:"400px",left:"40%",width:"400px",backgroundColor:"#000000",padding:"20px 50px" ,color:"#ffffff",textAlign:"center",fontSize:"50px",fontWeight:"bold"}}>
      <h1>{victoryDol===1?'백돌! ':'흑돌! '} Victory!</h1>
      <button className="btn btn-primary fs-3" onClick={(e)=>{
          setIsStart(true)
          setOmok(defaultObject)
          setIsVictory(false)
          setVictoryDol('')
          setClickCount(0)
          setSuSaveArray([])
      }} >Play Now!</button>
      </div>
   
    </div>
  );
}

export default App;
