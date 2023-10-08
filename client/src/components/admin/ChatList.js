// ChatList.js
import React from 'react';

const ChatList = () => {
    return (
        <div className="bg-light p-3 h-100">
            <h5>Chat List</h5>
            <ul className="list-group">
                {/* List of chats */}
                <li className="list-group-item">Chat 1</li>
                <li className="list-group-item">Chat 2</li>
                <li className="list-group-item">Chat 3</li>
            </ul>
        </div>
    );
};

export default ChatList;
