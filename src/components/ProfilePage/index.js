import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import RenderProfileStories from '../RenderProfileStories'
import RenderProfilePosts from '../RenderProfilePosts'

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

  onClickTryAgain = () => this.fetchProfileData()

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
          alt="my profile"
          className="myProfilePic"
        />
        <div className="textContainer">
          <h1 className="userNameProfile">{DataList.userName}</h1>
          <div className="followersContainer">
            <p className="infoText">{DataList.postsCount} posts</p>
            <p className="infoText">{DataList.followerCount} followers</p>
            <p className="infoText">{DataList.followingCount} following</p>
          </div>
          <p className="userId">{DataList.userId}</p>
          <p className="infoText">{DataList.userBio}</p>
        </div>
      </div>
    )
  }

  renderStoriesContainer = () => {
    const {storiesList} = this.state
    const storiesAlt = 'my story'
    return (
      <ul className="storiesContainer">
        {storiesList.map(eachitem => (
          <RenderProfileStories
            storiesDetails={eachitem}
            key={eachitem.image}
            storiesAltText={storiesAlt}
          />
        ))}
      </ul>
    )
  }

  renderPostContainer = () => {
    const {postList} = this.state
    const postsAlt = 'my post'
    return (
      <div className="myProfilePostsContainer">
        <div className="headLogo">
          <BsGrid3X3 />
          <h1 className="postsText">Posts</h1>
        </div>
        <ul className="myPosts">
          {postList.map(eachItem => (
            <RenderProfilePosts
              profilePostData={eachItem}
              key={eachItem.postId}
              profileAltText={postsAlt}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderNoPostsContainer = () => (
    <div className="noProfilePostsContainer">
      <BiCamera />
      <h1>No Posts</h1>
    </div>
  )

  renderSuccessView = () => {
    const {postList} = this.state
    if (postList.length === 0) {
      return this.renderNoPostsContainer()
    }
    return this.renderPostContainer()
  }

  renderFinalView = () => (
    <div>
      {this.renderInfoContainer()}
      {this.renderStoriesContainer()}
      {this.renderSuccessView()}
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647771626/alert-triangle_n6ddqk.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="tryAgainButton"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderFinalView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="myProfileContainer">
          <div className="contentContainer">{this.renderPage()}</div>
        </div>
      </>
    )
  }
}

export default ProfilePage
