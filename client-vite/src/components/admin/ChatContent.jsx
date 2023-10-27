const ChatContent = () => {
    return (
        <div className="p-3 h-100">
            <h5>Chat Content</h5>
            <div className="chat-messages">
                {/* Messages between users */}
                <div className="message">User 1: Hello</div>
                <div className="message">User 2: Hi there</div>
                {/* More messages... */}
            </div>

            {/* Chat Input Box */}
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Type a message" />
                <button className="btn btn-primary">Send</button>
            </div>
        </div>
    );
};

export default ChatContent;
