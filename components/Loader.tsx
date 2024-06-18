import { Radio } from 'react-loader-spinner'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen' ><Radio
    visible={true}
    height="80"
    width="80"
    color= "#df7722"

    ariaLabel="radio-loading"
    
  
    /></div>
  )
}

export default Loader