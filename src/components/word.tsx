import React from 'react'

import Letter from './letter'

interface WordProps {
  letters: string[],
  history: string[]
}

export default function Word ({ letters, history }: WordProps): JSX.Element {
  return (
    <div>
      {letters.map((letter, index) => {
        return (<Letter key={index} hide={!history.includes(letter)} letter={letter} />)
      })}
    </div>
  )
}