import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterPrompt.css';
import TextSection from './TextSection';
import TextInputPrompt from './TextInputPrompt';
import AppearancePrompt from './AppearancePrompt';

const CharacterPrompt = () => {
    let promptResult;
    const appearanceStep = 3;

    const [characterState, setCharacterState] = useState({
        name: '',
        style: '',
        personality: '',
        introduction: '',
        gender: '',
        race: '',
    });

    const [step, setStep] = useState(0);
    const steps = [
        {
            stepLabel: 'Name',
            headLine: 'Enter your character name',
            descrition: `Please write the character's name in one word. (e.g. Luna)`,
            textareaClassName: 'nameTextarea',
            keywords: [
                'Twinkle',
                'Milo',
                'Luna',
                'Piper',
                'Finn',
                'Rosie',
                'Ellie',
                'Max',
                'Jasper',
                'Ivy',
                'Benny',
                'Clara',
                'Daisy',
                'Eddie',
                'Freddie',
                'Greta',
                'Hazel',
                'Iris',
                'Jack',
                'Kiki',
                'Leo',
                'Maggie',
                'Nina',
                'Ollie',
                'Polly',
                'Quincy',
                'Rory',
                'Sally',
                'Timmy',
                'Uma',
                'Vinnie',
                'Wendy',
                'Xander',
                'Yara',
                'Zara',
                'Andy',
                'Bella',
                'Charlie',
                'Dora',
                'Evan',
                'Fiona',
                'George',
                'Holly',
                'Ian',
                'Julie',
                'Karl',
                'Lily',
                'Mike',
                'Nora',
                'Oscar',
            ],
            textareaName: 'name',
        },
        {
            stepLabel: 'Style',
            headLine: 'Enter your character style',
            descrition: `Please describe the style of your character. \nFor instance, inspired by the vibrant and detailed aesthetics of Pixar animations.`,
            textareaClassName: 'styleTextarea',
            keywords: [
                'DISNEY',
                'PIXAR',
                'GHIBLI',
                'AMERICAN-CARTOON',
                'SIMPSON',
                'KOREAN-WEBTOON',
            ],
            textareaName: 'style',
        },
        {
            stepLabel: 'Personality',
            headLine: `Enter your character's Personality`,
            descrition: `Please describe the character's personality traits, behavior, strengths, weaknesses, or any other relevant details for the description. This will help me create a more accurate and vivid portrayal.`,
            textareaClassName: 'personalityTextarea',
            keywords: [
                'Adventurous',
                'Ambitious',
                'Compassionate',
                'Courageous',
                'Curious',
                'Determined',
                'Empathetic',
                'Enthusiastic',
                'Generous',
                'Honest',
                'Imaginative',
                'Independent',
                'Intelligent',
                'Joyful',
                'Kind-hearted',
                'Loyal',
                'Meticulous',
                'Optimistic',
                'Passionate',
                'Patient',
                'Perceptive',
                'Playful',
                'Practical',
                'Quirky',
                'Resilient',
                'Resourceful',
                'Sarcastic',
                'Sincere',
                'Spontaneous',
                'Strategic',
                'Sympathetic',
                'Thoughtful',
                'Trustworthy',
                'Wise',
                'Witty',
                'Assertive',
                'Brave',
                'Calm',
                'Charming',
                'Creative',
                'Diplomatic',
                'Energetic',
                'Friendly',
                'Gracious',
                'Humble',
                'Innovative',
                'Jovial',
                'Keen',
                'Mysterious',
                'Nurturing',
            ],
            textareaName: 'personality',
        },
        {
            stepLabel: 'Type',
            headLine: `Enter your character's Type`,
            descrition: `Please specify whether the character is human or animal. \nIf human, please select gender and ethnic background. \nIf animal, please specify the animal species.`,
            textareaClassName: '',
            keywords: [],
            textareaName: '',
        },
        {
            stepLabel: 'Hair or Fur Style',
            headLine: 'Enter the hair or fur style of the character.',
            descrition: `Please describe the character's appearance. If the character is a human, specify the hair style. If the character is an animal, specify the fur style.`,
            textareaClassName: 'furDescriptionTextarea',
            keywords: [
                'Black hair',
                'Brown hair',
                'Blond hair',
                'Red hair',
                'Chestnut hair',
                'Auburn hair',
                'Silver hair',
                'Golden hair',
                'Mahogany hair',
                'Platinum blonde hair',
                'Long hair',
                'Short hair',
                'Curly hair',
                'Straight hair',
                'Wavy hair',
                'Braided hair',
                'Ponytail',
                'Bob cut',
                'Mohawk',
                'Afro hairstyle',
                'Pixie cut',
                'Layered hair',
                'Messy bun',
                'Top knot',
                'Dreadlocks',
                'Cornrows',
                'French braid',
                'Fishtail braid',
                'Beehive hairdo',
                'Shaved head',
            ],
            textareaName: 'furDescription',
        },
        {
            stepLabel: 'Clothes',
            headLine: `Enter the attire of your character.`,
            descrition: `Please provide a detailed description of the clothing your character is wearing.`,
            textareaClassName: 'clothesTextarea',
            keywords: [
                'Jeans',
                'White T-shirt',
                'Black Leather Jacket',
                'Hat',
                'Sneakers',
                'Blue Shirt',
                'Brown Fleece Jacket',
                'Sweater',
                'Cap',
                'Sneakers',
                'Checkered Shirt',
                'Parka',
                'Short-sleeve Shirt',
                'Casual Jacket',
                'Hoodie',
                'Flannel Shirt',
                'Slippers',
                'Fleece Beanie',
                'Leggings',
                'Athletic Pants',
                'Polo Shirt',
                'Leather Belt',
                'Fleece Jacket',
                'Slip-on Shoes',
                'Skinny Jeans',
                'Basic Hoodie',
                'Faux Leather Jacket',
                'Denim Shirt',
                'Casual Pants',
                'Baseball Cap',
            ],
            textareaName: 'clothes',
        },
        {
            stepLabel: 'Eyes Color',
            headLine: 'Enter the eye color of your character.',
            descrition: `Please specify the eye color of your character. (e.g. brown, blue, black, etc.) \nIf additional details are needed, please include them.`,
            textareaClassName: 'eyesTextarea',
            keywords: [
                'Brown eyes',
                'Blue eyes',
                'Green eyes',
                'Hazel eyes',
                'Gray eyes',
                'Amber eyes',
                'Black eyes',
                'Violet eyes',
                'Turquoise eyes',
                'Gold eyes',
                'Copper eyes',
                'Sapphire eyes',
                'Emerald eyes',
                'Topaz eyes',
                'Ruby eyes',
                'Aquamarine eyes',
                'Silver eyes',
                'Chestnut eyes',
                'Indigo eyes',
                'Maroon eyes',
            ],
            textareaName: 'eyes',
        },
        {
            stepLabel: 'Introduction',
            headLine: 'Enter your character Introduction',
            descrition: `Please describe an introduction for your character, including key details such as their occupation, background, and major personality traits. Highlight any unique qualities or experiences that make them stand out. Remember, \nthe more specific and detailed your description, the higher the accuracy in capturing the essence of your character.`,
            textareaClassName: 'introductionTextarea',
            keywords: [],
            textareaName: 'introduction',
        },
    ];

    //이미지 생성 페이지 넘어가는 함수
    const navigate = useNavigate();
    const navigateCharacterImageGeneratePage = () => {
        navigate('/character/result', { state: promptResult });
    };

    return (
        <div className="CharacterPrompt">
            <TextSection step={step} steps={steps} />
            <div className="DescritionSection">
                <TextInputPrompt
                    step={step}
                    setStep={setStep}
                    steps={steps}
                    characterState={characterState}
                    setCharacterState={setCharacterState}
                />
                {/* {step === appearanceStep ? (
                    <AppearancePrompt
                        step={step}
                        setStep={setStep}
                        characterState={characterState}
                        setCharacterState={setCharacterState}
                    />
                ) : (
                )} */}
            </div>
        </div>
    );
};

export default CharacterPrompt;
