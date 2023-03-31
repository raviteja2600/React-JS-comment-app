import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
    count: 0,
  }

  isCommentLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isFavorite: !eachComment.isFavorite}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
      count: prevState.count - 1,
    }))
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onChangeInput = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isFavorite: false,
      initialBackgroundColor: initialBackgroundColorName,
    }

    if (name.length !== 0 && comment.length !== 0) {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        count: prevState.count + 1,
        name: '',
        comment: '',
      }))
    }
  }

  render() {
    const {name, comment, commentsList, count} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Comments</h1>
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
            alt="comments"
            className="image"
          />
          <form onSubmit={this.onAddComment} className="form-container">
            <p className="label">Say something about 4.0 Technologies</p>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeInput}
                value={name}
                id="inputId"
                className="input-bar"
              />
              <textarea
                placeholder="Your Comment"
                onChange={this.onChangeComment}
                value={comment}
                className="text-area"
              />
            </div>
            <button type="submit" className="submit-button">
              Add Comment
            </button>
          </form>
        </div>
        <hr className="horizontal-line" />
        <div className="count-comment-container">
          <div className="count-container">
            <p className="count">{count}</p>
          </div>
          <p className="comment-heading">Comments</p>
        </div>
        <ul className="lists-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              eachComment={eachComment}
              isCommentLike={this.isCommentLike}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
