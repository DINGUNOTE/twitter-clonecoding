import { useRef, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CustomInput = styled.div`
  position: relative;
  label {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

const Thumb = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    display: block;
    width: calc(100% - 2rem);
  }
  button {
    all: unset;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const NweetForm = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileName = useRef();

  const onSubmit = async e => {
    e.preventDefault();

    let attachmentUrl = '';

    if (window.confirm('Are you going to upload it?')) {
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
        creator: userObj.displayName,
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
    }
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
    fileName.current.value = null;
    setAttachment('');
  };

  return (
    <Form onSubmit={onSubmit}>
      {attachment && (
        <Thumb>
          <img src={attachment} alt="" />
          <button type="button" onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </Thumb>
      )}
      <CustomInput>
        <textarea
          type="text"
          onChange={onChange}
          placeholder="What's on your mind?"
          value={nweet}
          minLength={5}
          maxLength={120}
          required
        />
        <label htmlFor="image">
          <FontAwesomeIcon icon={faImage} />
        </label>
        <input
          type="file"
          id="image"
          ref={fileName}
          onChange={onFileChange}
          accept="image/*"
        />
      </CustomInput>

      <input type="submit" value="Nweet" />
    </Form>
  );
};

export default NweetForm;
