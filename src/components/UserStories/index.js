import Slider from 'react-slick'
import './index.css'
import UserStoriesitem from '../UserStoriesItem'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

const UserStories = props => {
  const {userStoriesList} = props
  return (
    <div className="slick-container">
      <Slider {...settings}>
        {userStoriesList.map(eachitem => (
          <UserStoriesitem itemDetails={eachitem} key={eachitem.userId} />
        ))}
      </Slider>
    </div>
  )
}

export default UserStories
