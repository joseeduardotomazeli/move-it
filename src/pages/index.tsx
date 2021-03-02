import Head from 'next/head'

import CountdownProvider from '../contexts/CountdownContext'

import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ChallengeBox from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'

function Home() {
  return (
    <>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <div className={styles.container}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </>
  )
}

export default Home
