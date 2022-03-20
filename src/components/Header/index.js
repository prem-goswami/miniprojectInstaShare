import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {useState} from 'react'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {getSearchResults} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const [searchInput, setSearchInput] = useState('')
  const onChangeSearch = event => setSearchInput(event.target.value)
  const onClickSearch = () => {
    getSearchResults(searchInput)
  }

  return (
    <div className="navContainer">
      <div className="headContainer">
        <div className="websiteLogoContainer">
          <img
            src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647488445/instaShareLogo_wfbdew.png"
            alt="websiteLogo"
            className="websiteLogo"
          />
          <h1 className="logoHeading">Insta Share</h1>
        </div>
        <div className="container2">
          <div className="searchContainer">
            <input type="search" onChange={onChangeSearch} />
            <button
              type="button"
              className="searchIcon"
              onClick={onClickSearch}
            >
              <FaSearch />
            </button>
          </div>
          <Link to="/" className="butt1">
            Home
          </Link>
          <Link to="/my-profile" className="butt1">
            Profile
          </Link>
          <button
            type="button"
            className="logoutButton"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
