import { useParams } from "react-router-dom"

const ProjectPage = () => {
    const { id } = useParams();


  return (
    <div>ProjectPage of ID: {id}</div>
  )
}

export default ProjectPage;