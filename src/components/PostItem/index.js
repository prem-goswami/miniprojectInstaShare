import './index.css'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import {FaRegComment} from 'react-icons/fa'

const PostItem = props => {
  const {postDetails, isLiked} = props
  const {
    imageUrl,
    caption,
    profilePic,
    userName,
    likesCount,
    createdAt,
    postId,
    userId,
  } = postDetails

  return (
    <li className="postItem">
      <div className="profileContainer">
        <img
          src={profilePic}
          alt="post author profile"
          className="profilePic"
        />
        <Link to={`/users/${userId}`} className="userName">
          {userName}
        </Link>
      </div>
      <img src={imageUrl} alt="post" className="postImage" />
      <div className="buttonContainer">
        <button type="button" className="button" testid="likeIcon">
          <BsHeart className="icon" />
        </button>
        <button type="button" testid="FaRegComment" className="button">
          <FaRegComment className="icon" />
        </button>
        <button type="button" testid="BsShare" className="button">
          <BiShareAlt className="icon" />
        </button>
      </div>
      <p className="likes">{likesCount} likes</p>
      <p>{caption}</p>
      <p className="createdAt">{createdAt}</p>
    </li>
  )
}

export default PostItem
