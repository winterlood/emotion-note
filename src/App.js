import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import AppRouter from "./AppRouter";

export const emotionDataContext = createContext(null);
export const DiaryStateContext = createContext(null);
export const DiaryDispatchContext = createContext(null);

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      console.log(action.data);
      newState = state.map((it) =>
        it.id === action.data.id
          ? {
              ...action.data,
            }
          : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData !== null) {
      const dirarList = JSON.parse(localData).sort((a, b) => b.id - a.id);
      dataId.current = dirarList[0].id + 1;

      dispatch({ type: "INIT", data: JSON.parse(localData) });
    } else {
      dispatch({ type: "INIT", data: [] });
    }
  }, []);

  const onCreate = useCallback((date, content, emotion) => {
    const nowSavingDate = new Date(date);
    nowSavingDate.setHours(0);
    nowSavingDate.setMinutes(0);
    nowSavingDate.setSeconds(0);

    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: nowSavingDate.getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, date, content, emotion) => {
    const nowSavingDate = new Date(date);
    nowSavingDate.setHours(0);
    nowSavingDate.setMinutes(0);
    nowSavingDate.setSeconds(0);

    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: nowSavingDate.getTime(),
        content,
        emotion,
      },
    });
  }, []);

  const emotionData = useMemo(
    () => [
      {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: "완전 좋음",
      },
      {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: "좋음",
      },
      {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: "그럭저럭",
      },
      {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: "나쁨",
      },
      {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: "끔찍함",
      },
    ],
    []
  );

  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onRemove,
      onEdit,
    };
  }, []);

  return (
    <emotionDataContext.Provider value={emotionData}>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memoizedDispatch}>
          <div className="App">
            <AppRouter />
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </emotionDataContext.Provider>
  );
};

export default App;
