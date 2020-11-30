import './Feed.css'
import React, { useEffect, useState } from 'react';
import MessageSender from './MessageSender';
import db from './firebase';
import Post from './Post';
import { useStateValue } from './StateProvider';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [{ user }, userDispatch] = useStateValue();
    const [{ active }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    return (
        <div className="feed">
            <MessageSender />

            {
                (active === "home")
                    ? posts.map(post => (
                        <Post
                            key={post.id}
                            id={post.id}
                            profilePic={post.data.profilePic}
                            message={post.data.message}
                            timestamp={post.data.timestamp}
                            username={post.data.username}
                            image={post.data.image}
                            likes={post.data.likes}
                        />
                    ))
                    : (active === "myPosts")
                        ? posts.map(post => {
                            if (post.data.profilePic === user.photoURL) {
                                return <Post
                                    key={post.id}
                                    id={post.id}
                                    profilePic={post.data.profilePic}
                                    message={post.data.message}
                                    timestamp={post.data.timestamp}
                                    username={post.data.username}
                                    image={post.data.image}
                                    likes={post.data.likes}
                                />
                            }
                        })
                        : posts.map(post => {
                            if (post.data.likes.includes(user.uid)) {
                                return <Post
                                    key={post.id}
                                    id={post.id}
                                    profilePic={post.data.profilePic}
                                    message={post.data.message}
                                    timestamp={post.data.timestamp}
                                    username={post.data.username}
                                    image={post.data.image}
                                    likes={post.data.likes}
                                />
                            }
                        })
            }

        </div>
    )
}

export default Feed;
