import { useParams } from "react-router-dom";

export default function Forum() {
  let params = useParams();
  return <div>Forum {params.forumId}</div>;
}
