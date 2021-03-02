import { createContext, useState, useEffect, ReactNode } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  activeChallenge: Challenge
  challengesCompleted: number
  nextLevelExperience: number
  levelUp: () => void
  newChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

const ChallengesContext = createContext({} as ChallengesContextData)

function ChallengesProvider(props: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const { children } = props

  const nextLevelExperience = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel((level) => level + 1)
  }

  function newChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted')
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
      })
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return

    let finalExperience = currentExperience + activeChallenge.amount

    if (finalExperience > nextLevelExperience) {
      finalExperience = finalExperience - nextLevelExperience
      levelUp()
    }

    setCurrentExperience(finalExperience)

    setActiveChallenge(null)
    setChallengesCompleted((challengesCompleted) => challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        activeChallenge,
        challengesCompleted,
        nextLevelExperience,
        levelUp,
        newChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export { ChallengesContext }

export default ChallengesProvider
