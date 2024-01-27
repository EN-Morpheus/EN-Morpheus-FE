import React, { useState } from "react";
import MorpheusLoading from "../animation/MorpheusLoading";
import "./MorpheusBuilderPage.css";
import ThemeSelector from "../components/ScenarioCreator/ThemeSelector";
import CharactorSelector from "../components/ScenarioCreator/CharacterSelector";
import DraftSelector from "../components/ScenarioCreator/DraftSelector";
import ImageSelector from "../components/ScenarioCreator/ImageSelector";
import { useNavigate } from "react-router-dom";

const MorpheusBuilderPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isThemeBoxExpanded, setIsThemeBoxExpanded] = useState(false);
  const [isCharacterBoxExpanded, setIsCharacterBoxExpanded] = useState(false);
  const [topic, setTopic] = useState("");

  const handleLoadingFinished = () => {
    setLoading(false);
  };

  const handleThemeBoxClick = () => {
    setIsThemeBoxExpanded(true);
    setIsCharacterBoxExpanded(false);
  };

  const handleCharacterBoxClick = () => {
    setIsThemeBoxExpanded(false);
    setIsCharacterBoxExpanded(true);
  };

  const handleCloseButtonClick = () => {
    setIsThemeBoxExpanded(false);
    setIsCharacterBoxExpanded(false);
  };

  //캐릭터 ID 하위 컴포넌트에서 받아오는 함수
  const onCharacterSelected = (characterId) => {
    console.log("Selected character Id:", characterId);
  };

  return (
    <div className="scenario-making-page">
      {loading && <MorpheusLoading onFinished={handleLoadingFinished} />}
      <div className="scenario-making-panel">
        {!isThemeBoxExpanded && (
          <div className="character-panel" onClick={handleCharacterBoxClick}>
            <CharactorSelector
              expanded={isCharacterBoxExpanded}
              onClose={handleCloseButtonClick}
              onCharacterSelect={onCharacterSelected}
            ></CharactorSelector>
          </div>
        )}
        {!isCharacterBoxExpanded && (
          <div className="theme-panel" onClick={handleThemeBoxClick}>
            <ThemeSelector
              expanded={isThemeBoxExpanded}
              onClose={handleCloseButtonClick}
              topic={topic}
              setTopic={setTopic}
            ></ThemeSelector>
          </div>
        )}
      </div>
      {!(isThemeBoxExpanded || isCharacterBoxExpanded) && (
        <div>
          <button
            className="draft-button"
            onClick={() => navigate("./scenario-draft")}
          >
            AI Scenario Draft
          </button>
        </div>
      )}
    </div>
  );
};

export default MorpheusBuilderPage;
