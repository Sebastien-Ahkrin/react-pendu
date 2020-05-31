import React, { useState } from 'react'
import * as heroes from 'superheroes'

import Letter from './letter.component'
import Pendu from './pendu.component'

interface GameState {
  word: string,
  history: string[],
  errors: number
}

const DEFAULT_GAME: GameState = {
  word: heroes.random().toLowerCase(),
  history: [],
  errors: 0
}

function isActualWinned (actual: string, history: string[]): boolean {
  let isWin = true
  for (const letter of actual.split('')) {
    if (!history.includes(letter)) {
      isWin = false
    }
  }
  return isWin
}

function isLoose (errors: number): boolean {
  return errors >= 2
}

export default function Game (): JSX.Element {
  const [data, setData] = useState(DEFAULT_GAME)

  function handleSubmit (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    event.preventDefault()

    const element = document.getElementById('letter') as HTMLInputElement
    const old = data.history.slice()

    old.push(element.value)
    setData({ word: data.word, history: old, errors: data.errors } as GameState)
    
    console.log(data.word)
    if (!data.word.split('').includes(element.value)) {
      setData({ word: data.word, history: old, errors: data.errors + 1 } as GameState)
    }
    
    if (isLoose(data.errors)) {
      alert('You loose')
    }

    if (isActualWinned(data.word, old)) {
      alert('Winned !')
    }

    element.value = ''
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

      <Pendu errors={data.errors} />
    </div>
  )
}
