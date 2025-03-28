document.addEventListener('DOMContentLoaded', function () {
    const showSafeButton = document.getElementById('show-safe');
    const showMinesButton = document.getElementById('show-mines');
    const toggleProbabilities = document.getElementById('probabilities');

    showSafeButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: showSafeSpot
            });
        });
    });

    showMinesButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: showMines
            });
        });
    });

    toggleProbabilities.addEventListener('change', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: toggleProbabilitiesFunction,
                args: [toggleProbabilities.checked]
            });
        });
    });
});

function showSafeSpot() {
    const boardState = getBoardState();
    const solution = solveBoard(boardState);
    highlightSafeSpot(solution);
}

function showMines() {
    const boardState = getBoardState();
    const solution = solveBoard(boardState);
    highlightMines(solution);
}

function toggleProbabilitiesFunction(enabled) {
    if (enabled) {
        const boardState = getBoardState();
        const solution = solveBoard(boardState);
        displayProbabilities(solution);
    } else {
        clearProbabilities();
    }
}