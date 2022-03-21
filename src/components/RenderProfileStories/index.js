import './index.css'

const RenderProfileStories = props => {
  const {storiesDetails} = props
  const {image} = storiesDetails
  return (
    <li className="listItem">
      <img src={image} alt="my story" className="storyImage" />
    </li>
  )
}

export default RenderProfileStories
