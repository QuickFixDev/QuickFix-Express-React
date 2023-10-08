import React from 'react';
import ChatList from '../../components/admin/ChatList';
import ChatContent from '../../components/admin/ChatContent';

const WAChat = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                {/* Chat List Column */}
                <div className="col-md-3 bg-danger h-100">
                    <ChatList />
                </div>

                {/* Chat Content Column */}
                <div className="col-md-9 h-100">
                    <ChatContent />
                </div>
            </div>
        </div>
    );
}

export default WAChat;
