import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigate('/');
  };
  return (
    <>
      <button type="button" onClick={onLogOut}>
        Log Out
      </button>
    </>
  );
};

export default Profile;
