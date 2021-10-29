import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import MyButton from "../components/MyButton";
const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      setData(() => []);
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData((data) =>
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = useCallback(() => {
    setCurDate(
      (curDate) =>
        new Date(
          curDate.getFullYear(),
          curDate.getMonth() + 1,
          curDate.getDate()
        )
    );
  }, []);

  const decreaseMonth = useCallback(() => {
    setCurDate(
      (curDate) =>
        new Date(
          curDate.getFullYear(),
          curDate.getMonth() - 1,
          curDate.getDate()
        )
    );
  }, []);

  const headText = useMemo(() => {
    return `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  }, [curDate]);

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
