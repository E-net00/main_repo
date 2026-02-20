// Array of possible secret words
const words = ["lion","elephant","tiger","gorilla","kangaroo","enguin","koala","crocodile","dolphin","whale","snake","eagle","butterfly","monkey","deer","fox","wolf","bear","zebra","giraffe","hippopotamus","rhinoceros","chimpanzee","orangutan","lemur","meerkat","mouse","armadillo","ostrich","flamingo","peacock","cameleon","frog","toad","turtle","shark","octopus","squid","jellyfish","crab","lobster","horse","cow","pig","sheep","goat","chicken","duck","turkey","cat"];

// Select a random secret word
let secretWord = words[Math.floor(Math.random() * words.length)];

// Log the secret word to console for testing (as per instructions)
console.log("Secret word (for testing):", secretWord);

// Maximum attempts
const maxAttempts = 5;
let attemptsLeft = maxAttempts;

// DOM elements for browser interaction
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

// Add DOM elements for enhancements

const restartBtn = document.getElementById('restartBtn');
const hintDiv = document.getElementById('hint');
const attemptsDiv = document.getElementById('attempts');

// Initialize hint display
function updateHint() {
    if (secretWord.length > 0) {
        const firstLetter = secretWord[0].toUpperCase();
        hintDiv.textContent = `Hint: The word starts with '${firstLetter}'`;
    }
}

// Update attempts display
function updateAttemptsDisplay() {
    attemptsDiv.textContent = `Attempts remaining: ${attemptsLeft}`;
}

// Reset game function (Restart Button)
function restartGame() {
    // Reset variables
    attemptsLeft = maxAttempts;
    secretWord = words[Math.floor(Math.random() * words.length)];
    
    // Log new secret word for testing
    console.log("Secret word (for testing):", secretWord);
    
    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    messageDiv.textContent = 'Welcome! Guess the secret word.';
    
    // Reset background color
    document.body.style.backgroundColor = '#c6e2ff';
    
    // Update displays
    updateHint();
    updateAttemptsDisplay();
    
    // Focus input
    guessInput.focus();
}

// Function to handle guess submission
function submitGuess() {
    // Check if game is already over
    if (submitBtn.disabled) {
        return;
    }
    
    // Get user input, trim whitespace, and convert to lowercase (string methods)
    let userGuess = guessInput.value.trim().toLowerCase();
    
    // Clear input field
    guessInput.value = '';
    
    // Check if input is empty (after trimming)
    if (userGuess === '') {
        messageDiv.textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
        return;
    }
    
    // Decrement attempts
    attemptsLeft--;
    
    // Update attempts display
    updateAttemptsDisplay();
    
    // Check if guess is correct (if-else conditional)
    if (userGuess === secretWord) {
        messageDiv.textContent = "Congratulations! You guessed the secret word!";
        
        // Win - Change background to green
        document.body.style.backgroundColor = '#90EE90';
        
        // Disable submit, show restart
        submitBtn.disabled = true;
        submitBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
        
        return;
    }
    
    // If incorrect and attempts left
    if (attemptsLeft > 0) {
        messageDiv.textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
    } else {
        // Game over (loop ends implicitly here)
        messageDiv.textContent = `Game over! The secret word was '${secretWord}'.`;
        
        // Lose - Change background to red
        document.body.style.backgroundColor = '#FFB6C1';
        
        // Disable submit, show restart
        submitBtn.disabled = true;
        submitBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
    }
}

// Event listener for button click (browser interaction)
submitBtn.addEventListener('click', submitGuess);

// Restart button event listener

restartBtn.addEventListener('click', restartGame);

// Allow Enter key to submit (Keyboard Support)
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitGuess();
    }
});


// Initialize game on load
updateHint();
updateAttemptsDisplay();