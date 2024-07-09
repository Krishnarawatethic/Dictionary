const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

const searchWord = async () => {
    let word = inpWord.value;
    fetch(`${url}${word}`).then((response) => response.json()).then((data) => {
        console.log(data);
        if (data && data.length > 0) {
            let wordData = data[0];
            let meanings = wordData.meanings;
            let phonetics = wordData.phonetics[0];
            
            result.innerHTML = `<div class="word">
                    <h3>${word}</h3>
                    <button id="sound-btn">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${meanings[0].partOfSpeech}</p>
                    <p>/${phonetics.text}/</p>
                </div>
                <p class="word-meaning">${meanings[0].definitions[0].definition}</p>
                <p class="word-example">${meanings[0].definitions[0].example || "No example available"}</p>`;
            
            document.getElementById("sound-btn").addEventListener("click", () => {
                sound.setAttribute("src", phonetics.audio);
                sound.play();
            });
        } else {
            result.innerHTML = `<p>No results found for "${word}". Please try another word.</p>`;
        }
    }).catch((error) => {
        console.error('Error:', error);
        result.innerHTML = `<p>Error retrieving the word. Please try again later.</p>`;
    });
};

btn.addEventListener("click", searchWord);

inpWord.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchWord();
    }
});
