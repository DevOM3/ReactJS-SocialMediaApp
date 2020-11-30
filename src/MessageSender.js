import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import db from './firebase';
import './MessageSender.css';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

const MessageSender = () => {
    const [input, setInput] = useState('');
    const [{ user }, userDispatch] = useStateValue();
    const [imageURL, setImageURL] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: imageURL,
            likes: [],
        });

        setInput('');
        setImageURL('');
    }

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL} />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} className="messageSender__input" placeholder={`How's going on ${user.displayName.split(' ')[0]} ?`} />
                    <input value={imageURL} onChange={e => setImageURL(e.target.value)} placeholder="Image URL (Optional)" />
                    <button onClick={handleSubmit} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageSender;
