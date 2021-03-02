import { useContext } from 'react'

import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext)

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countdown}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.button}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.button} ${styles.buttonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={startCountdown}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Countdown
