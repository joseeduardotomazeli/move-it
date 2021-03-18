import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.css'

function ExperienceBar() {
  const { currentExperience, nextLevelExperience } = useContext(
    ChallengesContext
  )

  const percentNextLevel =
    Math.round(currentExperience * 100) / nextLevelExperience

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>

      <div>
        <div style={{ width: `${percentNextLevel}%` }} />

        <span
          className={styles.currentExperience}
          style={{ left: `${percentNextLevel}%` }}
        >
          {currentExperience}
        </span>
      </div>

      <span>{nextLevelExperience} xp</span>
    </header>
  )
}

export default ExperienceBar
