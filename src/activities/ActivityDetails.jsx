import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import useQuery from "api/useQuery.js";
import { useMutation } from "..api/useMutation.js";

export default function ActivityDetails() {
  const { token } = useAuth();
  const [id] = useParams();
  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, "activity");

  if (loading) return <p>Loading...</p>;
  if (error || !activity) {
    return <p>Sorry! {error}</p>;
  }

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && <DeleteButton id={activity.id} />}
    </>
  );
}

function DeleteButton({ id }) {
  const navigate = useNavigate();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + id, ["activities", "activity"]);

  const onDeleteActivity = async () => {
    const success = await deleteActivity();
    if (success) navigate("/activities");
  };

  return (
    <button onClick={onDeleteActivity}>
      {loading ? "Deleting" : error ?? "Delete"}
    </button>
  );
}
