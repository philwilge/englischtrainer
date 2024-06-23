async function translateText() {
    const text = document.getElementById('inputText').value;
    if (!text) {
        alert('Bitte gib ein deutsches Wort oder Satz ein.');
        return;
    }

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=de|en`);
    const data = await response.json();
    const translatedText = data.responseData.translatedText;
    
    document.getElementById('outputText').innerText = translatedText;
    
    // Automatische Sprachwiedergabe nach 0,5 Sekunden Verzögerung
    setTimeout(speakText, 500);
}

function speakText() {
    const text = document.getElementById('outputText').innerText;
    if (!text) {
        alert('Es gibt keinen Text zum Anhören.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
}
