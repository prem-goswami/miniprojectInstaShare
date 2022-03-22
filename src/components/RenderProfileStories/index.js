import './index.css'

const RenderProfileStories = props => {
  const {storiesDetails, storiesAltText} = props
  const {image} = storiesDetails
  return (
    <li className="listItem">
      <img src={image} alt={storiesAltText} className="storyImage" />
    </li>
  )
}

export default RenderProfileStories
