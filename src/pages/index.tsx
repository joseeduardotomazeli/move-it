import Head from 'next/head'
import { GetServerSideProps } from 'next'

import ChallengesProvider from '../contexts/ChallengesContext'
import CountdownProvider from '../contexts/CountdownContext'

import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ChallengeBox from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

function Home(props: HomeProps) {
  const { level, currentExperience, challengesCompleted } = props

  return (
    <>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ChallengesProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
      >
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
      </ChallengesProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    level = 1,
    currentExperience = 0,
    challengesCompleted = 0,
  } = context.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}

export default Home
