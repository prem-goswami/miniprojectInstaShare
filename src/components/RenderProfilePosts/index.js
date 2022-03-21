import './index.css'

const RenderProfilePosts = props => {
  const {profilePostData} = props
  const {postImage} = profilePostData
  return (
    <li className="myProfilePostsItem">
      <img src={postImage} alt="postImage" />
    </li>
  )
}

export default RenderProfilePosts
