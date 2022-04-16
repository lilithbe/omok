import React from 'react'
import styled from 'styled-components'
const DolButton = styled.button`
    background-color:${props =>props.dol===1?'#ffffff':props.dol===2?'#000000':'#00000000'};
    border: 0px solid #00000013;
    border-radius: 45%;
    ${props =>props.dol===-1?'display:none;':''};
    width:${props =>props.dol===-1?'0px':'30px'};
    height:${props =>props.dol===-1?'0px':'30px'};
    margin:0.02em 0.159em;
    cursor:pointer;
    :hover{
        border: 1px solid #000000;
        background-color:${props =>props.currentDol===1?'#ffffff':props.currentDol===2?'#000000':'#00000000'};
          background-color:${props =>props.dol>0?props.currentDol>0?'red':'#00000000':'#00000000'};     
    }
   
`
const Dol = ({colickHandler,dol, currentDol,isVictory}) => {
  return (
    <span><DolButton disabled={isVictory} onClick={colickHandler} currentDol={currentDol} dol={dol}>
  
      </DolButton></span>
  )
}

export default Dol