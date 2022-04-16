import React from 'react'
import styled from 'styled-components'
import borderImage from '../board.png'
const NormalBoard=styled.div`
background-image:url("${borderImage}");
width:675px;
height:675px;
background-size:cover;
padding:3px 3px 4px 3px;
}
`
const Board = ({children}) => {
  return (
    <NormalBoard>{children}</NormalBoard>
  )
}

export default Board