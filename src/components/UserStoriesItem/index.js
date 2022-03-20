import {Link} from 'react-router-dom'
import './index.css'

const UserStoriesitem = props => {
  const {itemDetails} = props
  return (
    <div className="eachItem">
      <img src={itemDetails.storyUrl} alt="userStory" className="storyImage" />
      <p className="userNameStories">{itemDetails.userName}</p>
    </div>
  )
}

export default UserStoriesitem
