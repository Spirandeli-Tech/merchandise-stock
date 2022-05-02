import React from 'react'
import {ReactComponent as ReactEmpty } from '../assets/logos/empty.svg'

function Empty({name, complement = ''}){
  return(
  <div className='empty' >
    <ReactEmpty/>
    <span>{`Nenhum${complement} ${name} encontrado.`}</span>
  </div>
  )}

export default Empty
