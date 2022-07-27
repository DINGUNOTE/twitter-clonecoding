import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(nweetRef);
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
