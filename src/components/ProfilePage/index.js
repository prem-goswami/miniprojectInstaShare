import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

import Header from '../Header'
import RenderProfileStories from '../RenderProfileStories'

class ProfilePage extends Component {
  state = {
    apiStatus: '',
    DataList: [],
    postList: [],
    storiesList: [],
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  fetchProfileData = async () => {
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookie.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({apiStatus: 'SUCCESS'})
      const postData = data.profile.posts.map(eachItem => ({
        postId: eachItem.id,
        postImage: eachItem.image,
      }))
      const storiesData = data.profile.stories.map(eachItem => ({
        id: eachItem.id,
        image: eachItem.image,
      }))
      const fetchedData = {
        followerCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({
        DataList: fetchedData,
        postList: postData,
        storiesList: storiesData,
      })
    } else {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  renderInfoContainer = () => {
    const {DataList} = this.state
    return (
      <div className="infoContainer">
        <img
          src={DataList.profilePic}
          alt="profile pic"
          className="myProfilePic"
        />
        <div className="textContainer">
          <h1 className="userNameProfile">{DataList.userName}</h1>
          <div className="followersContainer">
            <p>{DataList.postsCount} posts</p>
            <p>{DataList.followerCount} followers</p>
            <p>{DataList.followingCount} following</p>
          </div>
          <p className="userId">{DataList.userId}</p>
          <p>{DataList.userBio}</p>
        </div>
      </div>
    )
  }

  renderStoriesContainer = () => {
    const {storiesList} = this.state
    return (
      <ul className="storiesContainer">
        {storiesList.map(eachitem => (
          <RenderProfileStories storiesDetails={eachitem} key={eachitem.id} />
        ))}
      </ul>
    )
  }

  renderPage = () => (
    <div className="myProfileContainer">
      <div className="contentContainer">
        {this.renderInfoContainer()}
        {this.renderStoriesContainer()}
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    )
  }
}

export default ProfilePage
