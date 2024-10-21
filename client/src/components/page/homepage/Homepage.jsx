import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { promiseFetch } from '../../../helpers/fetch';
import { useDialog } from '../../../hooks/useDialog';
import icon from '../../../assets/icons/icon.png';
import styles from './Homepage.module.css';

function Homepage() {
  const { user, setUser, levels, API_URL } = useContext(GameContext);
  const navigate = useNavigate();

  const createRound = async (levelId) => {
    const savedRound = user.rounds.find((r) => r.photoId === levelId);
    if (savedRound) {
      return navigate(`/levels/${levelId}`);
    } else {
      promiseFetch({
        url: `${API_URL}/rounds`,
        options: {
          method: 'post',
          body: {
            userId: user.id,
            photoId: levelId,
          },
        },
      }).then(() => {
        promiseFetch({
          url: `${API_URL}/users/${user.id}`,
          options: { method: 'get', body: null },
        }).then((updatedUser) => {
          if (Object.keys(updatedUser).length) {
            setUser(updatedUser);
          }
          navigate(`/levels/${levelId}`);
        });
      });
    }
  };

  const { ref, setRules } = useDialog();

  return (
    <>
      <header className={styles.header}>
        <div>Welcome to Where is Waldo?</div>
        <img src={icon}></img>
      </header>
      <section className={styles.section}>
        <button className={styles.rulesBtn} onClick={() => setRules(true)}>
          Rules
        </button>
        <dialog onCancel={() => setRules(false)} ref={ref}>
          <div className={styles.dialogContent}>
            <div>{`"Where's Waldo?" rules`}</div>
            <div>Click on any Level you want to play.</div>
            <div>
              On the level page, you will have an image and a list of characters
              you must find in the image.
            </div>
            <div>
              Once you think you have found one of the characters, click on the
              place where you think you have found it and click on the
              corresponding character image.
            </div>
            <div>
              If you are right, a circle will appear around the character.
            </div>
            <div>
              Once you have found all the characters, the game is over. If you
              do not have a username, you will be asked to enter one.
            </div>
            <button onClick={() => setRules(false)}>Close</button>
          </div>
        </dialog>
        <div>Try to find Waldo and his friends in the levels below!</div>
        <div className={styles.levels}>
          {levels &&
            levels.map((level) => {
              return (
                <button
                  key={level.id}
                  onClick={() => createRound(level.id)}
                  to={`/levels/${level.id}`}
                  className={styles.levelBtn}
                >
                  <div>Level {level.id}</div>
                  <img src={`../src/assets/images/${level.title}`} alt="" />
                </button>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Homepage;
