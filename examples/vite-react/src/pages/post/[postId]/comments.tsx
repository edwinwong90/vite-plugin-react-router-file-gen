import { useParams } from "react-router"

export default function PostComments() {
  const params = useParams()
  return <h2>Post ID: {params.postId} comments</h2>
}