import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router";
import { DiaryDispatchContext, emotionDataContext } from "../App";
import EmotionItem from "../components/EmotionItem";
import Header from "../components/Header";
import MyButton from "../components/MyButton";

const getStringDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const history = useHistory();
  const emotionList = useContext(emotionDataContext);
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);

  const contentRef = useRef(null);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      history.replace(`/`);
    }
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
      history.replace(`/`);
    }
  };

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(() => emotion);
  }, []);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              window.history.back();
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              type={"negative"}
              text={"삭제하기"}
              onClick={handleRemove}
            />
          )
        }
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>

          <div className="input-box">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input_date"
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>오늘의 감정</h4>

          <div className="input-box emotion-list-wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                isSelected={it.emotion_id === emotion}
                onClick={handleClickEmote}
              />
            ))}
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>

          <div className="input-box text_warpper">
            <textarea
              ref={contentRef}
              placeholder={"오늘은 어땠나요?"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div className="control-box">
            <MyButton
              text={"취소하기"}
              onClick={() => {
                window.history.back();
              }}
            />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
