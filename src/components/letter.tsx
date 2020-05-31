import React from 'react'

interface LetterProps {
  letter: string,
  hide: boolean
}

export default function Letter (props: LetterProps): JSX.Element {
  return (
    <input 
      className='shadow appearance-none border rounded m-2 w-6' 
      type='text' 
      defaultValue={(props.hide ? '' : props.letter)}
    >
    </input>
  )
}