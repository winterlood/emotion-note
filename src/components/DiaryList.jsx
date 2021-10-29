import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const DiaryListFilter = memo(({ value, onChange, optionList }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="DiaryListFilter"
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const history = useHistory();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const handleChangeSortType = useCallback((sortType) => {
    setSortType(sortType);
  }, []);

  const handleChangeFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);

  const getProcessedDiaryList = useMemo(() => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  }, [sortType, filter, diaryList]);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <DiaryListFilter
            value={sortType}
            onChange={handleChangeSortType}
            optionList={sortOptionList}
          />
          <DiaryListFilter
            value={filter}
            onChange={handleChangeFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새 일기쓰기"}
            type={"positive"}
            onClick={() => history.push("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList.map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
