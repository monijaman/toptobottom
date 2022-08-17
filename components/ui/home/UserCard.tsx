//import { Button, Typography } from '@mui/material';
import { memo } from 'react';

import { getAuthState, setName } from 'store/slices/authSlice';
import { useDispatch, useSelector } from 'store/store';
import styles from 'styles/Home.module.css';

/**
 * A simple User card that pulls user info from redux-toolkit and displays it.
 * @constructor
 */
function UserCard() {
  const dispatch = useDispatch();
  const { name, email } = useSelector(getAuthState);

  const onClick = () => {
    setTimeout(() => {
      dispatch(setName('monirrr'));
      // dispatch(setEmail('sulhadin@hotmail.com'));
    }, 100);
  };

  console.log('user info', name, email);
  return (
    <>
      <h1>
        Hi  {name} 
      </h1>

      <p className={styles.description}>
        <code className={styles.code}>Something is wrong I can feel it!</code>
        <button onClick={onClick}>Change it!</button>
      </p>
    </>
  );
}

export default memo(UserCard);