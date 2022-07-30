import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

const NweetForm = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url',
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    try {
      await addDoc(collection(dbService, 'nweets'), nweetObj);
    } catch (error) {
      console.log(error);
    }
    setNweet('');
    setAttachment('');
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onFileChange = e => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        placeholder="What's on your mind?"
        value={nweet}
        maxLength={120}
      />
      <input type="file" onChange={onFileChange} accept="image/*" />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px;" height="50px;" alt="" />
          <button type="button" onClick={onClearAttachment}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default NweetForm;
