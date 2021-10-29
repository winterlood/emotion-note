import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const history = useHistory();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    history.push(`/diary/${id}`);
  };

  const goEdit = () => {
    history.push(`/edit/${id}`);
  };
  return (
    <div className={["DiaryItem"]}>
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default memo(DiaryItem);
