import { useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #edeced;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  p {
    color: #ee6723;
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > span {
    display: inline-block;
    opacity: 0.5;
    transition: all 0.3s ease;
    &.on {
      color: #ee6723;
      opacity: 1;
    }
  }

  button {
    all: unset;
    position: relative;
    width: 4rem;
    height: 2rem;
    background-color: #fff;
    border: 2px solid #ee6723;
    border-radius: 50px;
    span {
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      content: '';
      width: 1.4rem;
      height: 1.4rem;
      background: #ee6723;
      border-radius: 50%;
      transition: left 0.3s ease;
    }
    &.on span {
      left: 2.3rem;
    }
  }
`;

const CustomInput = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }

  input {
    padding-left: 2.5rem;
  }
`;

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = e => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create account
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // log in
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <Container>
      <Toggle>
        <span className={newAccount ? 'on' : null}>Join</span>
        <button
          type="button"
          className={newAccount ? null : 'on'}
          onClick={toggleAccount}
        >
          <span></span>
        </button>
        <span className={newAccount ? null : 'on'}>Login</span>
      </Toggle>
      <form onSubmit={onSubmit}>
        <CustomInput>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            value={email}
            required
            autoFocus
          />
        </CustomInput>
        <CustomInput>
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            value={password}
            required
          />
        </CustomInput>

        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error ? <p>{error}</p> : null}
      </form>
    </Container>
  );
};

export default AuthForm;
