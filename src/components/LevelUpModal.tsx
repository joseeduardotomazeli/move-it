import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/LevelUpModal.module.css'

function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModal}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button
          type="button"
          className={styles.button}
          onClick={closeLevelUpModal}
        >
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  )
}

export default LevelUpModal
