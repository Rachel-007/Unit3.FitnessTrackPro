import axios from "axios";
import { Route, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ActivityDetails() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${userid}`)
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userid]);

  return (
    <div>
      <h2> ActivityDetails for {userid?.name} </h2>
      <p> {user?.activities?.name}</p>
      <Route path="/activities/:userid" />
      <h3>Activity Details</h3>
      <p>Id: {user?.id}</p>
      <p>Activity: {user?.activity?.name}</p>
      <p>Description: {user?.description}</p>

      <Link to={`/activities/${userid}/edit`}>Edit Activity</Link>
    </div>
  );
}

export default ActivityDetails;
