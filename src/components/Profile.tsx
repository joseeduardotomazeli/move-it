import styles from "../styles/components/Profile.module.css"

function Profile() {
  return (
    <div className={styles.profile}>
      <img
        src="https://github.com/joseeduardotomazeli.png"
        alt="José Eduardo Tomazeli"
      />

      <div>
        <strong>José Eduardo Tomazeli</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  )
}

export default Profile
