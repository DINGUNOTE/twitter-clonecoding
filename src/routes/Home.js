import { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetForm from 'components/NweetForm';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const dbNweets = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(dbNweets, snapshot => {
      const nweetList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NweetForm userObj={userObj} />
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
