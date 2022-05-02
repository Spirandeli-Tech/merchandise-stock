import React from 'react'
import { ReactComponent as ReactEmpty} from '../../../assets/logos/empty.svg'

function Empty({name}){
  return(
  <div className='Empty-Plan' >
    <ReactEmpty/>
    <span>{`Nenhum ${name} encontrado.`}</span>
  </div>
  )}

export default Empty