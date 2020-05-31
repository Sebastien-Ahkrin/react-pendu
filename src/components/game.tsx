import React, { useReducer, useRef, useEffect } from 'react'
import axios from 'axios'

import Pendu from './pendu'
import Word from './word'

interface GameState {
  word: string,
  history: string[],
  errors: number,
  progress: string
}

const FullGameState = { start: 'STARTING', end: 'END' }
const DEFAULT_GAME: GameState = {
  word: '',
  history: [],
  errors: 0,
  progress: FullGameState.start
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

const ActionType = { success: 'onGood', reject: 'onFailed', fetch: 'fetchWord', change: 'onChange' }
function reducer (state: GameState, action: { type: string, value: any }): GameState {
  const slice = state.history.slice()
  slice.push(action.value)
  
  switch (action.type) {
    case ActionType.reject:
      if (state.errors + 1 >= 6) {
        return { ...state, progress: FullGameState.end, errors: state.errors + 1 }
      }
      return { ...state, errors: state.errors + 1, history: slice }
    case ActionType.success:
      if (isActualWinned(state.word, slice)) {
        return { ...state, history: slice, progress: FullGameState.end }
      }
      return { ...state, history: slice }
    case ActionType.fetch: 
      return { ...DEFAULT_GAME, word: action.value }
    case ActionType.change: 
      return { ...state, progress: action.value }
    default: throw new Error()
  }
}

/*
  avoir un state ? GAME_INIT, GAME_PROGESS, GAMe_WIN ? 
*/
export default function Game (): JSX.Element {
  const [state, dispatch] = useReducer(reducer, DEFAULT_GAME)

  useEffect(() => {
    if (state.progress === FullGameState.start) {
      const id: number = Math.floor(Math.random() * (151 - 1 + 1) + 1)
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(({ data }) => {
        dispatch({ type: ActionType.fetch, value: data.name })
      }).catch(console.error)
    }
  }, [state.progress])

  const input = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    event.preventDefault()
    if (input.current === null || Number(input.current.value) || input.current.value.length > 1) return
    const value = input.current.value
    dispatch({ type: (!state.word.split('').includes(value) ? ActionType.reject : ActionType.success), value })
    input.current.value = ''
  }

  function handleClick (): void {
    dispatch({ type: ActionType.change, value: FullGameState.start })
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

      {state.progress === FullGameState.end && (
        <div>
          <p>Vous avez: {(state.errors >= 6) ? 'Perdu ...' : 'Gagné !'}</p>
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleClick}
          >Recommencer</button>
        </div>
      )}

      <p>History: {state.history.join(' ')}</p>
      <Pendu errors={state.errors}/>
    </div>
  )
}