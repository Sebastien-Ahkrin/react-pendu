import React, { useState, useReducer, useRef } from 'react'
import * as heroes from 'superheroes'

import Pendu from './pendu'
import Word from './word'

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
  return errors >= 6
}

/*
  useReducer pour le state, 
  call api avec useEffect (api pokemon) + avoir un state ? GAME_INIT, GAME_PROGESS, GAMe_WIN ? 
*/
export default function Game (): JSX.Element {
  const [data, setData] = useState(DEFAULT_GAME)
  const input = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    event.preventDefault()
    if (input.current === null) { return }

    const value = input.current.value
    const old = data.history.slice()

    old.push(value)
    setData({ word: data.word, history: old, errors: data.errors })

    if (!data.word.split('').includes(value)) {
      setData({ word: data.word, history: old, errors: data.errors + 1 })
    }

    if (isLoose(data.errors)) {
      alert('You loose')
    }

    if (isActualWinned(data.word, old)) {
      alert('Winned !')
    }

    input.current.value = ''
  }

  return (
    <div>
      <p>Find the word: [solution: {data.word}]</p>
      <Word letters={data.word.split('')} history={data.history}/>

      <p>Find:</p>
      <form>
        <input ref={input} className='shadow appearance-none border rounded py-2 m-2' type='text'/>
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