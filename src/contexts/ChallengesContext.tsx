import { createContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

import LevelUpModal from '../components/LevelUpModal'

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
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  children: ReactNode
}

const ChallengesContext = createContext({} as ChallengesContextData)

function ChallengesProvider(props: ChallengesProviderProps) {
  const { children, ...rest } = props

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  )

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const nextLevelExperience = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel((level) => level + 1)
    setIsLevelUpModalOpen(true)
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

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
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
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export { ChallengesContext }

export default ChallengesProvider
