import React, { useState } from 'react'
import * as heroes from 'superheroes'

import Letter from './letter.component'

interface GameState {
  word: string,
  history: string[]
}

const DEFAULT_GAME: GameState = {
  word: heroes.random().toLowerCase(),
  history: []
}

function isActualWinned (actual: string, history: string[]): boolean {
  let isWin = true
  for (const letter of actual.split('')) {
    console.log(`Letter: ${letter}, include: ${history.includes(letter)}, history: ${history}`)
    if (!history.includes(letter)) {
      isWin = false
    }
  }
  return isWin
}

export default function Game (): JSX.Element {
  const [data, setData] = useState(DEFAULT_GAME)

  function handleSubmit (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    event.preventDefault()

    const element = document.getElementById('letter') as HTMLInputElement
    const old = data.history.slice()
    old.push(element.value)
    setData({ word: data.word, history: old } as GameState)
    
    element.value = ''
    
    if (isActualWinned(data.word, data.history)) {
      alert('Winned !')
    }
  }

  return (
    <div>
      <p>Find the word: [solution: {data.word}]</p>

      {data.word.split('').map((letter, index) => {
        return (<Letter key={index} hide={!data.history.includes(letter)} letter={letter}/>)
      })}

      <p>Find:</p>
      <form>
        <input id='letter' className='shadow appearance-none border rounded py-2 m-2' type='text'/>
        <input
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
          type='submit' 
          value='Envoyer'
          onClick={handleSubmit}
        />
      </form>
      
      <p>History: {data.history.join(' ')}</p>
    </div>
  )
}