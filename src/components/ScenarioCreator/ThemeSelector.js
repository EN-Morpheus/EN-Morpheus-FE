import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import reducer from "../../api/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./ScenarioCreator.css";
import UserRequestApi from "../../api/UserRequestApi";
import ThemeSelectorLoading from "./ThemeSelectorLoading";
import BasedLoading from "../BasedLoading/BasedLoading";

const ThemeSelector = ({ expanded, onClose, topic, setTopic }) => {
  //서버에서 받아온 주제들
  const [aiTopic, setAiTopic] = useState([]);
  //items 에서 랜덤으로 추출한 주제들
  const [randomAiTopic, setRandomAiTopic] = useState([]);

  //서버 로딩, 연결 성공, 에러 판단로직
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  //서버에서 주제 받아올 때 reducer
  const [themeState, themeDispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  //서버에서 ai가 선정한 주제들을 받아오는 함수
  const fetchAiTopic = async () => {
    console.log("api호출");
    themeDispatch({ type: "LOADING" });
    try {
      const response = await UserRequestApi.get("/fairy/topic-random");
      const data = response.data.response.code;
      setAiTopic(data);
      pickRandomItems(data);
      themeDispatch({ type: "SUCCESS", data: data });
    } catch (error) {
      themeDispatch({ type: "ERROR", error });
    }
  };

  //서버로 사용자가 설정한 주제를 보내 가공시켜주는 함수
  const processTheme = async () => {
    console.log("api호출");
    dispatch({ type: "LOADING" });
    try {
      const response = await UserRequestApi.get(
        `/fairy/topic-manufacture?topic=${encodeURIComponent(topic)}`
      );
      setTopic(response.data.response.code.topic);
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", error });
    }
  };

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };
  //close버튼 클릭 이벤트
  const handleButtonClick = (event) => {
    if (event) event.stopPropagation();

    //topic 값이 있으면 onClose(), 없으면 alert창 표시
    if (topic) {
      onClose();
    } else {
      alert("Please Select Your Theme");
    }
  };
  //배열에서 랜덤으로 5개를 골라주는 함수
  const pickRandomItems = (data) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setRandomAiTopic(shuffled.slice(0, 5));
  };

  useEffect(() => {
    fetchAiTopic();
  }, []);
  return (
    <div className={`box-wrapper ${expanded ? "expanded" : ""}`}>
      <div className="scenario-box-wrapper-headline">
        {state.loading && <ThemeSelectorLoading />}
        <span className="step">Step 2</span>
        <br></br>
        Select Your Theme
      </div>
      {expanded && (
        <div className="expanded-component">
          <div className="topic-setup-headline"></div>
          <div className="theme-select-box">
            <div className="theme-input-box">
              <div>
                <input
                  type="text"
                  value={topic}
                  onChange={handleInputChange}
                  required
                ></input>
                <label>Theme</label>
              </div>
            </div>
            <button className="process-theme" onClick={processTheme}>
              AI Generate
            </button>
          </div>
          <div className="theme-example">
            <div className="theme-example-label">
              Examples of fairy tale themes
            </div>
            <span
              className="rotate-button"
              onClick={() => pickRandomItems(aiTopic)}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </span>
          </div>
          {themeState.loading ? (
            <BasedLoading />
          ) : (
            <div className="random-theme">
              {randomAiTopic.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTopic(item)}
                  className="random-theme-select"
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <button className="box-close-button" onClick={handleButtonClick}>
            Select Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
