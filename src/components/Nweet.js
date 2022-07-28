import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
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
    await updateDoc(nweetRef, {
      text: newNweet,
    });
    setIsEdit(false);
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {isEdit ? (
        <>
          <form onSubmit={onUpdate}>
            <input
              type="text"
              onChange={onChange}
              placeholder="Edit your nweet"
              value={newNweet}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button type="button" onClick={toggleEdit}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px;"
              height="50px;"
              alt=""
            />
          )}
          {isOwner && (
            <>
              <button type="button" onClick={toggleEdit}>
                Edit Nweet
              </button>
              <button type="button" onClick={onDelete}>
                Delete Nweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
