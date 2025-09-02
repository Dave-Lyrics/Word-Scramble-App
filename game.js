    let sentences = [
      "Artificial intelligence is shaping the future",
      "Knowledge is the key to unlocking opportunities",
      "Hard work beats talent when talent is lazy",
      "Success comes to those who never give up",
      "A positive mindset creates a positive life",
      "Discipline is the bridge between goals and success",
      "Reading daily increases wisdom and imagination",
      "Teamwork makes the dream work every time",
      "Creativity is intelligence having fun always",
      "The journey of a thousand miles begins with one step"
    ];

    let currentIndex = 0;
    let timeLeft = 60;
    let timer;

    // Start the game
    window.onload = function() {
      showSentence();
      startTimer();

    
      document.getElementById("userInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          checkAnswer();
        }
      });
    }

    function scramble(sentence) {
      let words = sentence.split(" ");
      for (let i = words.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      return words.join(" ");
    }

    function showSentence() {
      let scrambledSentence = scramble(sentences[currentIndex]);
      document.getElementById("scrambled").innerText = scrambledSentence;
      document.getElementById("userInput").value = "";
      document.getElementById("result").innerText = "";
      resetTimer();
    }

    function checkAnswer() {
      let userAnswer = document.getElementById("userInput").value.trim();
      let correctAnswer = sentences[currentIndex];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("result").innerText = "✅ Correct!";
        setTimeout(nextSentence, 1000); // auto-move to next after 1 sec
      } else {
        document.getElementById("result").innerText = "❌ Wrong! Try again.";
      }
    }

    function nextSentence() {
      currentIndex++;
      if (currentIndex >= sentences.length) {
        alert("🎉 You finished all sentences!");
        currentIndex = 0;
      }
      showSentence();
    }

    function startTimer() {
      timer = setInterval(function() {
        if (timeLeft > 0) {
          timeLeft--;
          document.getElementById("timer").innerText = timeLeft;
        } else {
          clearInterval(timer);
          alert("⏰ Time's up! Moving to next sentence.");
          nextSentence();
        }
      }, 1000); // countdown every 1 second
    }

    function resetTimer() {
      clearInterval(timer);
      timeLeft = 60;
      document.getElementById("timer").innerText = timeLeft;
      startTimer();
    }
  



/*


Awesome—let’s walk through your JavaScript **slowly and simply**, like you’re seeing JS for the very first time. I’ll explain what each piece does, why it’s there, and how the whole thing works together. I’ll also point out the HTML pieces this code expects to exist.

---

# Big Picture (what this program does)

* You have a list of **correct sentences**.
* For each sentence, the program **scrambles the words**, shows the scrambled version on the page, and starts a **60-second countdown**.
* The player types what they think the correct sentence is.
* The program **checks** if what they typed matches the original sentence (ignoring letter case).
* If time runs out, it **moves to the next sentence**.
* When you finish all sentences, it **congratulates** you and restarts.

This code expects these HTML elements to exist (by `id`):

* `scrambled` — where the scrambled sentence is shown
* `userInput` — the text box where the user types
* `result` — where you show “Correct!” or “Wrong!”
* `timer` — where the countdown number shows
* (Buttons in your HTML likely call `checkAnswer()` and `nextSentence()`)

---

# Line-by-line, top to bottom

### 1) The data (the sentences)

```js
let sentences = [
  "Artificial intelligence is shaping the future",
  ...
  "The journey of a thousand miles begins with one step"
];
```

* **What is this?** An **array** (a list) of strings. Each string is one full correct sentence.
* **Why?** We need something to check the player’s answer against.

---

### 2) Which sentence are we on?

```js
let currentIndex = 0;
```

* **What is this?** A number that points to **which sentence** we’re using right now.
* Starts at `0` (the **first** item in the list).

---

### 3) Timer setup

```js
let timeLeft = 60; // 60 seconds
let timer;
```

* `timeLeft` is the number of seconds left on the clock.
* `timer` will hold the **countdown’s ID** (so we can stop it later).

---

### 4) Start the game when the page finishes loading

```js
window.onload = function() {
  showSentence();
  startTimer();
}
```

* **`window.onload`** = “When the whole page is ready… run this.”
* First, we **show** a scrambled sentence.
* Then, we **start** the 60-second countdown.

---

### 5) Scramble a sentence (the shuffler)

```js
function scramble(sentence) {
  let words = sentence.split(" "); // split sentence into words
  for (let i = words.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]]; // swap words randomly
  }
  return words.join(" "); // join words back into a sentence
}
```

**Step by step:**

* `sentence.split(" ")` turns a sentence string into an **array of words**.

  * Example: `"I like pizza"` → `["I","like","pizza"]`
* The `for` loop is a **shuffle** (called Fisher–Yates):

  * It walks backwards through the array (`i` goes from last index to 1).
  * Each time, it picks a random position `j` between `0` and `i`.
  * Then it **swaps** the word at `i` with the word at `j`.
* `words.join(" ")` puts the words back into **one string**, with spaces between them.

**Result:** You get the same words, but in a **random order**.

---

### 6) Put the scrambled sentence on the page

```js
function showSentence() {
  let scrambledSentence = scramble(sentences[currentIndex]);
  document.getElementById("scrambled").innerText = scrambledSentence;
  document.getElementById("userInput").value = ""; // clear input
  document.getElementById("result").innerText = ""; // clear old result
  resetTimer();
}
```

**What happens here:**

* We take the **current correct sentence** (`sentences[currentIndex]`).
* We **scramble** it using the function above.
* We put the scrambled text into the HTML element with id `scrambled`.
* We **clear** the input box and the result message, so each round is clean.
* We **reset the timer** to 60 seconds for the new sentence.

---

### 7) Check what the user typed

```js
function checkAnswer() {
  let userAnswer = document.getElementById("userInput").value.trim();
  let correctAnswer = sentences[currentIndex];

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("result").innerText = "✅ Correct!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong! Try again.";
  }
}
```

**Step by step:**

* Get what the player typed: `.value` reads the input box text.
* `.trim()` removes extra spaces at the start/end.
* `correctAnswer` is the current real sentence from the list.
* We compare **lowercased** versions (so “Hello” and “hello” count as the same).
* If they match → show “✅ Correct!”
* If not → show “❌ Wrong! Try again.”

> Note: This function **does not** move to the next sentence. It just tells you if you’re right/wrong. You can move on with the “Next” button or some other trigger.

---

### 8) Go to the next sentence

```js
function nextSentence() {
  currentIndex++;
  if (currentIndex >= sentences.length) {
    alert("🎉 You finished all sentences!");
    currentIndex = 0; // restart game
  }
  showSentence();
}
```

**What it does:**

* Move the pointer to the **next** sentence (`currentIndex++`).
* If we’ve passed the **last** one (`>= sentences.length`), show a celebration, and **restart** from the first sentence.
* Then call `showSentence()` to scramble and display the new one (and reset the timer).

---

### 9) Start the countdown

```js
function startTimer() {
  timer = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
    } else {
      clearInterval(timer);
      alert("⏰ Time's up! Moving to next sentence.");
      nextSentence();
    }
  }, 1000); // decrease every 1 second
}
```

**Plain English:**

* `setInterval` runs the given function **every 1000 milliseconds** (every 1 second).
* Each second:

  * If there’s still time left, we **subtract 1** and update the number on the page.
  * If we hit **0**, we **stop** the timer (`clearInterval`), show an alert, and **move to the next sentence**.

**Why store `timer`?**

* `setInterval` returns an ID. We keep it in `timer` so we can **stop** the ticking later.

---

### 10) Reset the timer to 60 and start it again

```js
function resetTimer() {
  clearInterval(timer);
  timeLeft = 60;
  document.getElementById("timer").innerText = timeLeft;
  startTimer();
}
```

**What it does:**

* **Stops** any old ticking timer (so we don’t have two timers running).
* Sets `timeLeft` back to **60**.
* Updates the number on the page.
* Starts a **fresh** countdown.

---

## How everything works together (the flow)

1. **Page loads** → `window.onload` runs.
2. `showSentence()` scrambles and shows sentence #1, clears input, **resets timer**.
3. `startTimer()` starts counting down from **60**.
4. Player types and clicks **Check** → `checkAnswer()` compares text and shows ✅ or ❌.
5. Player clicks **Next** (or time runs out) → `nextSentence()` moves forward and calls `showSentence()` again.
6. When you’ve done **all sentences**, it congratulates you and **starts over**.

---

## Tiny glossary of new words

* **Array**: A list of things (like a list of sentences).
* **Index**: The position in a list. First item is index `0`.
* **Function**: A named set of steps you can run any time (e.g., `showSentence()`).
* **DOM**: The web page’s structure that JavaScript can read/change.
* **`document.getElementById("id")`**: Find something on the page by its id.
* **`setInterval(fn, time)`**: Run `fn` **again and again** every `time` ms.
* **`clearInterval(id)`**: Stop the repeating function started by `setInterval`.
* **`split` / `join`**: Break a string into pieces (`split`) or glue pieces back (`join`).
* **`toLowerCase()`**: Makes letters lowercase so comparisons are fair.
* **`trim()`**: Removes extra spaces at the start and end of a string.


*/// 