import { useParams } from "react-router"

export default function PostIdIndex() {
  const params = useParams()
  return (
    <h2>Post with ID: {params.postId}</h2>
  )
}