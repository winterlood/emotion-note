import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = ({ match }) => {
  const history = useHistory();
  const [originData, setOriginData] = useState();

  const diaryList = useContext(DiaryStateContext);
  const { id } = match.params;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id === parseInt(id));
      if (targetDiary) {
        console.log(targetDiary);
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        history.replace("");
      }
    }
  }, [id, diaryList]);

  return (
    <div className={"EditPage"}>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
