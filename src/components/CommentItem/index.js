import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, isCommentLike, onDeleteComment} = props
  const {
    id,
    name,
    comment,
    date,
    initialBackgroundColor,
    isFavorite,
  } = eachComment
  const newDate = formatDistanceToNow(date)
  const startLetter = name.slice(0, 1)
  const likeImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeText = isFavorite ? 'liked' : 'like'

  const onClickLike = () => {
    isCommentLike(id)
  }

  const onClickDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="list-container">
      <div className="top-section">
        <div className={`${initialBackgroundColor} letter-container`}>
          <p className="letter">{startLetter}</p>
        </div>
        <p className="name">{name}</p>
        <p className="date">{newDate}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="bottom-section">
        <div className="like-container">
          <img src={likeImage} alt="like" className="like-icon" />
          <button
            data-testid="delete"
            type="button"
            onClick={onClickLike}
            className="button"
          >
            <p className={likeText}>Like</p>
          </button>
        </div>
        <button
          data-testid="delete"
          type="button"
          className="button"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
