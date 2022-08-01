import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NweetStyle = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #edeced;
  & + li {
    margin-top: 1rem;
  }
  .creator {
    font-weight: 700;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Thumb = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    display: block;
    width: 100%;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
  button {
    all: unset;
    color: #ee6723;
    cursor: pointer;
  }
`;

const Nweet = ({ nweetObj, isOwner }) => {
  console.log(nweetObj);
  const [isEdit, setIsEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this nweet?')) {
      const attachmentRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteDoc(nweetRef);
      await deleteObject(attachmentRef);
    }
  };

  const toggleEdit = () => {
    setIsEdit(prev => !prev);
  };

  const onUpdate = async e => {
    e.preventDefault();
    if (nweetObj.text !== newNweet) {
      if (window.confirm('Are you going to change it?')) {
        await updateDoc(nweetRef, {
          text: newNweet,
        });
        setIsEdit(false);
      }
    }
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <NweetStyle>
      {isEdit ? (
        <>
          {nweetObj.attachmentUrl && (
            <Thumb>
              <img src={nweetObj.attachmentUrl} alt="" />
            </Thumb>
          )}
          <Form onSubmit={onUpdate}>
            <textarea
              type="text"
              onChange={onChange}
              placeholder="Edit your nweet"
              value={newNweet}
              minLength={5}
              maxLength={120}
              required
            />
            <input type="submit" value="Update Nweet" />
            <button type="button" onClick={toggleEdit}>
              Cancel
            </button>
          </Form>
        </>
      ) : (
        <>
          <p className="creator">{nweetObj.creator}</p>
          {nweetObj.attachmentUrl && (
            <ImageBox>
              <img src={nweetObj.attachmentUrl} alt="" />
            </ImageBox>
          )}

          <p className="text">{nweetObj.text}</p>
          {isOwner && (
            <ButtonBox>
              <button type="button" onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button type="button" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </ButtonBox>
          )}
        </>
      )}
    </NweetStyle>
  );
};

export default Nweet;
