import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
  minutes: number
  seconds: number
  isActive: boolean
  hasFinished: boolean
  resetCountdown: () => void
  startCountdown: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)

let timeout: NodeJS.Timeout

function CountdownProvider(props: ChallengesProviderProps) {
  const { newChallenge } = useContext(ChallengesContext)

  const initialTime = 25 * 60

  const [time, setTime] = useState(initialTime)

  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { children } = props

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      newChallenge()

      setIsActive(false)
      setHasFinished(true)
    }
  }, [isActive, time])

  function resetCountdown() {
    clearTimeout(timeout)

    setTime(initialTime)

    setIsActive(false)
    setHasFinished(false)
  }

  function startCountdown() {
    setIsActive(true)
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        resetCountdown,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}

export { CountdownContext }

export default CountdownProvider
