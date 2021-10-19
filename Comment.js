import react, { useState } from 'react';
import './Comment.css';
import user from './user.pmg.jpg';



const Comment = () => {
    const [text, setText] = useState("")
    const [replyText, setReplyText] = useState("")
    const [comment, setComment] = useState([])
    const [totalComments, setTotalComments] = useState(0)
    const [isReply, setIsReply] = useState(false)

    const handleClick = (e) => {
        let commentId = totalComments + 1
        let commentInfo = {
            commentId: commentId,
            user: 'Test',
            comment: text,
            date: new Date(),
            replies: []
        }
        let previousComment = comment

        previousComment.push(commentInfo)
        console.log("previousComment", previousComment, commentId)
        setComment(previousComment)
        setTotalComments(commentId)
        setText('')
    }
    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleChangeReply = (e) => {
        setReplyText(e.target.value)
    }
    const showReply = (e) => {
        setIsReply(true)
    }
    const handleReply = (commentId) => {
        console.log(replyText, commentId)
        console.log(comment)
        let index = comment.findIndex(oneComment => oneComment.commentId === commentId)
        console.log("index", index)
        let newCommentId = totalComments + 1
        let replyInfo = {
            commentId: newCommentId,
            user: 'Test',
            comment: text,
            date: new Date(),
            replies: []
        }
        comment[index].replies.push(replyInfo)
        setReplyText('')
        setIsReply(false)
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Join The Discussion"
                value={text}
                onChange={(e) => handleChange(e)}
            />
            <button onClick={(e) => handleClick(e)}>Add Comment</button>
            <div>
                {comment.map((item) => {

                    return (
                        <div className="main">
                            <div className="headerSection">
                                <img src={user} alt="user" height="50" width="50" />
                                <div className="user">
                                    {item.user}
                                </div>
                                <div className="date">
                                    {`${item.date}`}
                                </div>
                            </div>
                            <div className="comment">
                                {item.comment}
                            </div>
                            {item.replies.map(reply => {
                                <div>{reply.comment}</div>
                            })}
                            <div>
                                <button onClick={() => showReply()}>Reply</button>
                                {isReply ? (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Reply"
                                            value={replyText}
                                            onChange={(e) => handleChangeReply(e)}
                                        />
                                        <button onClick={(e) => handleReply(item.commentId)}>Reply</button>
                                        <div>

                                        </div>
                                    </div>
                                ) : ''}

                            </div>
                        </div>)

                })}

            </div>
        </div >
    )
}
export default Comment;