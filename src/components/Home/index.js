import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import UserStories from '../UserStories'
import PostItem from '../PostItem'

class Home extends Component {
  state = {
    apiStatus: 'INPROGRESS',
    storiesList: [],
    PostsList: [],
    searchInput: '',
    searchedPosts: [],
    searchButtonClicked: false,
  }

  componentDidMount() {
    this.fetchUserStories()
    this.fetchPosts()
  }

  fetchUserStories = async () => {
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookies.get('jwt_token')
    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(storiesUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedStoriesData = data.users_stories.map(eachItem => ({
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        storyUrl: eachItem.story_url,
      }))
      this.setState({
        storiesList: updatedStoriesData,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  searchClicked = searchvalue => {
    this.setState({searchInput: searchvalue, searchButtonClicked: true})
    this.getSearchResults()
  }

  getSearchResults = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.fetchSearchedPosts()
    }
    this.fetchPosts()
  }

  fetchSearchedPosts = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookies.get('jwt_token')
    console.log(searchInput)

    const postsUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(postsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({apiStatus: 'SUCCESS'})

      const postData = data.posts.map(eachItem => ({
        imageUrl: eachItem.post_details.image_url,
        caption: eachItem.post_details.caption,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
      }))

      this.setState({
        searchedPosts: postData,
      })
    } else {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  fetchPosts = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookies.get('jwt_token')
    console.log(searchInput)

    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(postsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({apiStatus: 'SUCCESS'})

      const postData = data.posts.map(eachItem => ({
        imageUrl: eachItem.post_details.image_url,
        caption: eachItem.post_details.caption,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
      }))

      this.setState({
        PostsList: postData,
      })
    } else {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  renderPosts = () => {
    const {PostsList} = this.state
    return (
      <ul className="postsContainer">
        {PostsList.map(eachitem => (
          <PostItem postDetails={eachitem} key={eachitem.postId} />
        ))}
      </ul>
    )
  }

  renderUserStories = () => {
    const {storiesList} = this.state
    return (
      <UserStories userStoriesList={storiesList} key={storiesList.userId} />
    )
  }

  renderStoriesLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => this.renderPosts()

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647771626/alert-triangle_n6ddqk.jpg"
        alt="failure"
      />
      <p>Something went wrong Please Try again</p>
      <button
        type="button"
        className="tryAgainButton"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderNoPostsView = () => (
    <div className="noPostsContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647830283/Group_olqwb0.jpg"
        alt="no result"
        className="noSearchResultImage"
      />
      <p>Search Not Found</p>
      <p>Try different keyword or search again </p>
    </div>
  )

  renderSearchedPosts = () => {
    const {searchedPosts} = this.state
    if (searchedPosts.length !== 0) {
      return (
        <div>
          <h1>Search Result</h1>
          <ul className="postsContainer">
            {searchedPosts.map(eachitem => (
              <PostItem postDetails={eachitem} key={eachitem.postId} />
            ))}
          </ul>
        </div>
      )
    }
    return this.renderNoPostsView()
  }

  renderFinalSearchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderPostsLoadingView()
      case 'SUCCESS':
        return this.renderSearchedPosts()
      default:
        return null
    }
  }

  renderSuccessView = () => this.renderPosts()

  renderFinalView = () => {
    const {apiStatus, searchButtonClicked} = this.state
    if (searchButtonClicked === true) {
      return this.renderSearchedPosts()
    }
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderPostsLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <ul>
          <Header searchClicked={this.searchClicked} />
        </ul>
        <div className="userStoriesContainer">{this.renderUserStories()}</div>
        <div className="userContainer1">{this.renderFinalView()}</div>
      </div>
    )
  }
}

export default Home
