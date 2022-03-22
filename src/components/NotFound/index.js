import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notFoundContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647862185/erroring_1_xfycay.jpg"
        alt="page not found"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <button
        type="button"
        className="homePageButton"
        onClick={onClickHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
