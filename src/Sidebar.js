import './Sidebar.css';
import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import { FavoriteBorderOutlined, PostAddRounded } from '@material-ui/icons';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(21),
        height: theme.spacing(21),
    },
}));

const Sidebar = () => {
    const [posts, setPosts] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));

        })
    }, []);

    const myPosts = posts.filter(post => post.data.profilePic === user.photoURL).length;
    const myLikes = posts.filter(post => post.data.likes.includes(user.uid)).length;
    const classes = useStyles();

    return (
        <div className="sidebar">
            <div className="sidebar__image">
                <Avatar src={user.photoURL} className={classes.large} />
            </div>
            <div className="sidebar__username">
                <h2>{user.displayName}</h2>
            </div>
            <div className="sidebar__email">
                <h4 style={{ color: "gray" }}>{user.email}</h4>
            </div>

            <div className="sidebar__info">
                <div className="myPosts">
                    <PostAddRounded fontSize="large" style={{ disply: "inline-block" }} />
                    <p style={{ disply: "inline-block" }}>{myPosts}</p>
                </div>
                <div className="myLikes">
                    <FavoriteBorderOutlined fontSize="large" style={{ disply: "inline-block" }} />
                    <p style={{ disply: "inline-block" }}>{myLikes}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
