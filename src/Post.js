import './Post.css';
import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Delete, Edit, FavoriteOutlined, } from '@material-ui/icons';
import { useStateValue } from './StateProvider';
import db from './firebase';

const Post = ({ id, profilePic, image, username, timestamp, message, likes }) => {
    const [{ user }, dispatch] = useStateValue();
    const [shouldEdit, setShouldEdit] = useState(false);
    const [input, setInput] = useState(message);
    const [imageURL, setImageURL] = useState(image);

    const likeHandler = () => {
        if (likes.includes(user.uid)) {
            likes = likes.filter(liker => liker !== user.uid)
        }
        else {
            likes.push(user.uid);
        }

        db.collection(`posts`).doc(id).set({
            profilePic,
            image,
            username,
            timestamp,
            message,
            likes: likes,
        })
    }

    const deleteHandler = () => {
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
            x.className = x.className.replace("show", "");
            db.collection('posts').doc(id).delete().catch(
                err => alert(err.message)
            );
        }, 751);

    }

    const editHandler = () => {
        setShouldEdit(true);
    }

    const handleEdit = (e) => {
        e.preventDefault();

        db.collection('posts').doc(id).set({
            profilePic,
            image: imageURL,
            username,
            timestamp,
            message: input,
            likes,
        });

        setShouldEdit(false);
    }

    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar" />
                <div className="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>
            {
                shouldEdit
                    ? <form className="post__bottom edit__form">
                        <input value={input} onChange={e => setInput(e.target.value)} className="messageSender__input" placeholder={`How's going on ${user.displayName.split(' ')[0]} ?`} />
                        <input value={imageURL} onChange={e => setImageURL(e.target.value)} placeholder="Image URL (Optional)" />
                        <button onClick={handleEdit} type="submit">
                            Submit
                    </button>
                    </form>
                    : <>
                        <div className="post__bottom">
                            <p>{message}</p>
                        </div>
                        <div className="post__image">
                            <img src={image} />
                        </div>
                    </>
            }
            <div className="post__options">
                <div className="post__option">
                    {
                        likes.includes(user.uid)
                            ? <IconButton onClick={likeHandler}><FavoriteOutlined className="like__button" style={{ color: "red" }} /></IconButton>
                            : <IconButton onClick={likeHandler}><FavoriteOutlined className="like__button" /></IconButton>
                    }
                    <p>{likes.length}</p>
                </div>
                {
                    (profilePic === user.photoURL)
                        ? <>
                            <div className="post__option__private">
                                <IconButton onClick={editHandler}>
                                    <Edit style={{ color: "gray" }} />
                                </IconButton>
                                <IconButton onClick={deleteHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <div id="snackbar">Deleting this post....</div>
                        </>
                        : <></>
                }
            </div>
        </div>
    )
}

export default Post;
