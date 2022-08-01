import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 100%;

  section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Auth = () => {
  const onSocialClick = async e => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <Container>
      <FontAwesomeIcon icon={faTwitter} size="2x" />
      <AuthForm />
      <section>
        <button type="button" name="google" onClick={onSocialClick}>
          <FontAwesomeIcon icon={faGoogle} />
          Continue with Google
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          <FontAwesomeIcon icon={faGithub} />
          Continue with GitHub
        </button>
      </section>
    </Container>
  );
};

export default Auth;
