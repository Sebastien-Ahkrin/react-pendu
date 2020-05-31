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

function reducer (state: GameState, action: { type: string, try: string | undefined }): GameState {
  const slice = state.history.slice()
  slice.push(action.try !== undefined ? action.try : '')
  
  switch (action.type) {
    case 'onFailed':
      return { ...state, errors: state.errors + 1, history: slice }
    case 'onGood':
      return { ...state, history: slice }
    default: throw new Error()
  }
}

/*
  call api avec useEffect (api pokemon) + avoir un state ? GAME_INIT, GAME_PROGESS, GAMe_WIN ? 
*/
export default function Game (): JSX.Element {
  const [state, dispatch] = useReducer(reducer, DEFAULT_GAME)
  const input = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    event.preventDefault()
    if (input.current === null) return 
    const value = input.current.value
    dispatch({ type: (!state.word.split('').includes(value) ? 'onFailed' : 'onGood'), try: value })
    input.current.value = ''
  }

  return (
    <div>
      <p>Find the word: [solution: {state.word}]</p>
      <Word letters={state.word.split('')} history={state.history}/>

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

      <p>History: {state.history.join(' ')}</p>
      <Pendu errors={state.errors} />
    </div>
  )
}