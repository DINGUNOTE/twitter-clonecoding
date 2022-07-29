import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const getMyNweets = async () => {
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    } else {
      return;
    }
  };

  const onLogOut = () => {
    authService.signOut();
    // authService.currentUser.uid;
    navigate('/');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button type="button" onClick={onLogOut}>
        Log Out
      </button>
    </>
  );
};

export default Profile;
