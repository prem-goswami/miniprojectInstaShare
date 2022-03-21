import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import RenderProfileStories from '../RenderProfileStories'
import RenderProfilePosts from '../RenderProfilePosts'

class SpecificUserPage extends Component {
  state = {
    apiStatus: '',
    DataList: [],
    postList: [],
    storiesList: [],
  }

  componentDidMount() {
    this.fetchUserData()
  }

  onClickTryAgain = () => this.fetchUserData()

  fetchUserData = async () => {
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const profileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({apiStatus: 'SUCCESS'})
      const postData = data.user_details.posts.map(eachItem => ({
        postId: eachItem.id,
        postImage: eachItem.image,
      }))
      const storiesData = data.user_details.stories.map(eachItem => ({
        id: eachItem.id,
        image: eachItem.image,
      }))
      const fetchedData = {
        followerCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
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
          alt="profilePic"
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
    return (
      <ul className="storiesContainer">
        {storiesList.map(eachitem => (
          <RenderProfileStories
            storiesDetails={eachitem}
            key={eachitem.image}
          />
        ))}
      </ul>
    )
  }

  renderPostContainer = () => {
    const {postList} = this.state
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

export default SpecificUserPage
