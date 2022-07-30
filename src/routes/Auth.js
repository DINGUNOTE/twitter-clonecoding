import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

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
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button type="button" name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
