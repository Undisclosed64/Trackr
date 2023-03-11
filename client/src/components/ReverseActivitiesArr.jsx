import React, { useEffect, useState } from "react";
import GetActivites from "./GetActivities";

export default function ReverseActivitiesArr({ project }) {
  const [reverseArr, setReverseArr] = useState([]);

  //reverse the project activities array
  useEffect(() => {
    if (project) {
      let arr = [];
      for (let i = 0; i < project.trackActivities.length; i++) {
        let element =
          project.trackActivities[project.trackActivities.length - (i + 1)];
        arr.push(element);
      }
      setReverseArr(arr);
    }
  }, [project]);
  return <>{project ? <GetActivites activities={reverseArr} /> : ""}</>;
}
