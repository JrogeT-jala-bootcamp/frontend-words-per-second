"use strict"

let wordsInput = document.getElementById("words-input");
let wordsMessage = document.getElementById("words-message");
let startBtn = document.getElementById("start-btn");
let secondsToAnalyse = 30;
let typing = false;
let onTime = true;

function onTextChange() {
    if (isReadyToStart()) {
        typing = true;
        wordsMessage.innerHTML = "Analysing...";
        startAnalysis();
    }
}

function isReadyToStart() {
    return !typing && onTime;
}

function startAnalysis() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            stopAnalysis();
            showResults();
            resolve();
        }, secondsToAnalyse * 1000);
    });
}

function stopAnalysis() {
    onTime = false;
    typing = false;
    wordsInput.readOnly = true;
}

function showResults() {
    // let words = wordsInput.value.split(" ");
    let words = wordsInput.value.replace(/[^ ]/g, "");
    let speed = (words.length + 1) / secondsToAnalyse;
    wordsMessage.innerHTML = `Analysis finished! Result: ${speed.toFixed(2)} words/second`;
    startBtn.hidden = false;
}

function resetAll() {
    startBtn.hidden = true;
    wordsInput.readOnly = false;
    wordsInput.value = "";
    wordsMessage.innerHTML = "";
    typing = false;
    onTime = true;
}
