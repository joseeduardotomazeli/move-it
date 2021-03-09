import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  )

  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeFailed() {
    resetCountdown()
    resetChallenge()
  }

  function handleChallengeSucceeded() {
    resetCountdown()
    completeChallenge()
  }

  return (
    <div className={styles.challengeBox}>
      {activeChallenge ? (
        <div className={styles.active}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img
              src={`/icons/${activeChallenge.type}.svg`}
              alt={activeChallenge.type}
            />

            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.failedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.succeededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.notActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <img src="/icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}

export default ChallengeBox
