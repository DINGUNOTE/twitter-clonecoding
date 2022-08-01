import { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import Nweet from 'components/Nweet';

import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NweetList = styled.ul`
  margin-top: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myNweets, setMyNweets] = useState([]);

  const getMyNweets = async () => {
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc'),
    );

    onSnapshot(q, snapshot => {
      const myNweets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyNweets(myNweets);
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
      if (window.confirm('Are you going to change your nickname?')) {
        await updateProfile(authService.currentUser, {
          displayName: newDisplayName,
        });
        refreshUser();
      }
    } else {
      return;
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Change Nickname" />
      </Form>
      <NweetList>
        {myNweets
          ? myNweets.map(nweet => (
              <Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
              />
            ))
          : null}
      </NweetList>
    </Container>
  );
};

export default Profile;
