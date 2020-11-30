import React, { useEffect, useState } from 'react';
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

const Header = () => {
    const [{ user }, userDispatch] = useStateValue();
    const [state, dispatch] = useStateValue();

    const onClickMyPosts = () => {
        if (!document.getElementById('myPosts').classList.contains('header__option--active')) {
            document.getElementById('myPosts').classList.add('header__option--active');
        }
        if (document.getElementById('home').classList.contains('header__option--active')) {
            document.getElementById('home').classList.remove('header__option--active');
        }
        if (document.getElementById('myLikes').classList.contains('header__option--active')) {
            document.getElementById('myLikes').classList.remove('header__option--active');
        }

        dispatch({
            type: actionTypes.SET_ACTIVE,
            active: "myPosts",
        });
    }
    const onClickHome = () => {
        if (document.getElementById('myPosts').classList.contains('header__option--active')) {
            document.getElementById('myPosts').classList.remove('header__option--active');
        }
        if (!document.getElementById('home').classList.contains('header__option--active')) {
            document.getElementById('home').classList.add('header__option--active');
        }
        if (document.getElementById('myLikes').classList.contains('header__option--active')) {
            document.getElementById('myLikes').classList.remove('header__option--active');
        }

        dispatch({
            type: actionTypes.SET_ACTIVE,
            active: "home",
        });
    }
    const onClickMyLikes = () => {
        if (document.getElementById('myPosts').classList.contains('header__option--active')) {
            document.getElementById('myPosts').classList.remove('header__option--active');
        }
        if (document.getElementById('home').classList.contains('header__option--active')) {
            document.getElementById('home').classList.remove('header__option--active');
        }
        if (!document.getElementById('myLikes').classList.contains('header__option--active')) {
            document.getElementById('myLikes').classList.add('header__option--active');
        }

        dispatch({
            type: actionTypes.SET_ACTIVE,
            active: "myLikes",
        });
    }

    return (
        <div className="header">
            <div className="header__left">
                <h1 className="heading">WeReact</h1>
            </div>

            <div className="header__middle">
                <IconButton onClick={onClickMyPosts}>
                    <div className="header__option" id="myPosts">
                        <PostAddRoundedIcon fontSize="large" />
                    </div>
                </IconButton>
                <IconButton onClick={onClickHome}>
                    <div className="header__option--active header__option" id="home">
                        <HomeRoundedIcon fontSize="large" />
                    </div>
                </IconButton>
                <IconButton onClick={onClickMyLikes}>
                    <div className="header__option" id="myLikes">
                        <FavoriteOutlinedIcon fontSize="large" />
                    </div>
                </IconButton>
            </div>

            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL} />
                    <h4>{user.displayName.split(' ')[0]}</h4>
                </div>
            </div>
        </div>
    )
}

export default Header;
