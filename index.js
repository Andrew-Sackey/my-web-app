const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const form = document.querySelector(".search-box");
const wordP = document.getElementById("word");
const wordM = document.querySelector(".word-meaning");
const wordPh = document.getElementById("phonetics");
const wordPos = document.getElementById("poS");
const wordA = document.querySelector(".antonyms");

const getDefinition = async (inputWord) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`,
    );
    const definition = await response.json();
    console.log(definition[0]);

    // empty word field
    wordP.innerText = definition[0].word;
    wordM.innerText = definition[0].meanings[0].definitions[0].definition;
    wordM.innerText = definition[0].meanings[1].definitions[0].definition;
    wordPh.innerText = definition[0].phonetics[1].text;
    wordPos.innerText = definition[0].meanings[0].partOfSpeech;
  } catch (error) {
    if (
      error.message === "Cannot read properties of undefined (reading 'word')"
    ) {
      window.alert(
        `The word "${inputWord}" could not be found in the dictionary`,
      );
    }
    console.log(error.message);
  }
};

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  return getDefinition(inpWord);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inpWord = document.getElementById("inp-word").value;
});

document.getElementById("speakButton").addEventListener("click", () => {
  const inpWord = document.getElementById("inp-word").value;
  if (inpWord) {
    const utterance = new SpeechSynthesisUtterance(inpWord);
    speechSynthesis.speak(utterance);
  } else {
    alert("Please enter a word.");
  }
});

// .catch(error => {
//   alert("sorry word not found");
// });
