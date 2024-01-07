import React, { useState, useReducer, useEffect } from "react";
import reducer from "../../api/Reducer";
import API from "../../api/API";

const predefinedTopics = [
  "The Importance of Sharing: A Story of Siblings Learning to Share Their Toys",
  "Bravery in Everyday Life: A Tale of a Child Overcoming Fear of the Dark",
  "The Joy of Learning: Adventures of a Curious Squirrel in School",
  "Understanding Differences: A Journey of Animals with Unique Abilities",
  "Friendship Across Cultures: Children from Different Countries Forming Bonds",
  "Kindness to Animals: A Young Girl's Quest to Help Stray Dogs",
  "The Value of Patience: A Rabbit's Adventure in Learning to Wait",
  "Respect for Elders: A Boy's Discovery of Wisdom from Grandparents",
  "The Magic of Teamwork: Insects Working Together to Build a Home",
  "Overcoming Jealousy: The Story of Two Friends and a Coveted Toy",
  "Perseverance Pays Off: A Duckling's Journey to Learn to Fly",
  "Honesty is the Best Policy: A Tale of a Child's Truthful Adventure",
  "The Beauty of Nature: A Day in the Life of Forest Creatures",
  "Learning Responsibility: A Young Farmer Taking Care of Farm Animals",
  "The Power of Imagination: A Child's Adventure in a Fantasy World",
  "Coping with Loss: A Gentle Story about a Child and a Lost Toy",
  "The Strength in Forgiveness: Siblings Learning to Forgive Each Other",
  "Gratitude for Everyday Things: A Child's Journey of Thankfulness",
  "Helping Others in Need: A Story of a Child Volunteering in the Community",
  "Embracing Change: A Butterfly's Transformation and Its Lessons",
];

const TopicSetupPage = () => {
  //input텍스트창 안에 입력된 주제
  const [topic, setTopic] = useState("");
  //서버에서 받아온 주제들
  const [aiTopic, setAiTopic] = useState(predefinedTopics);
  //items 에서 랜덤으로 추출한 주제들
  const [randomAiTopic, setRandomAiTopic] = useState([]);

  //서버 로딩, 연결 성공, 에러 판단로직
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  //서버에서 ai가 선정한 주제들을 받아오는 함수
  // const fetchAiTopic = async () => {
  //   dispatch({ type: "LOADING" });
  //   try {
  //     const response = await API.get("url");
  //     setAiTopic(response.data);
  //     pickRandomItems(response.data);
  //   } catch (error) {
  //     dispatch({ type: "ERROR", error });
  //   }
  // };

  //서버로 사용자가 설정한 주제를 보내 가공시켜주는 함수
  // const processTheme = async () => {
  //   dispatch({ type: "LOADING" });
  //   try {
  //     const response = await API.post("url", { topic });
  //     dispatch({ type: "SUCCESS", data: response.data });
  //     setTopic(response.data);
  //   } catch (error) {
  //     dispatch({ type: "ERROR", error });
  //   }
  // };

  //배열에서 랜덤으로 5개를 골라주는 함수
  const pickRandomItems = (/*data*/) => {
    const shuffled = [...aiTopic].sort(() => 0.5 - Math.random()); //data
    setRandomAiTopic(shuffled.slice(0, 5));
  };

  useEffect(() => {
    pickRandomItems();
  }, []);

  return (
    <div>
      <div className="topic-setup-headline">
        Please write a fairy tale theme
      </div>
      <div>
        <input
          type="text"
          value={topic}
          onChange={handleInputChange}
          required
        ></input>
        <button className="process-theme" /*onClick={processTheme}*/>
          processTheme
        </button>
      </div>
      <div>for example</div>
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
        <button onClick={pickRandomItems}>new theme</button>
      </div>
      <button>AI scenario</button>
    </div>
  );
};

export default TopicSetupPage;
