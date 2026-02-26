const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is 15 × 8?",
        options: ["100", "110", "120", "130"],
        answer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
        answer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: 2
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        answer: 0
    },
    {
        question: "Which element has the chemical symbol 'Au'?",
        options: ["Silver", "Gold", "Aluminum", "Argon"],
        answer: 1
    },
    {
        question: "In what year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        answer: 2
    }
];

const activeQuizzes = new Map();

export default {
    name: 'quiz',
    description: 'Play a trivia quiz game',
    category: 'Games',
    async execute(sock, m, { prefix }) {
        const chatId = m.key.remoteJid;
        
        // Check if quiz already active
        if (activeQuizzes.has(chatId)) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ A quiz is already active!\n\nAnswer the current question or wait 60 seconds for timeout.' 
            });
        }
        
        // Select random question
        const question = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
        
        let quizText = `╔═══════════════════╗\n` +
            `║  🧠 *QUIZ TIME*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `❓ *Question:*\n${question.question}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `📝 *Options:*\n\n`;
        
        question.options.forEach((opt, idx) => {
            quizText += `${idx + 1}. ${opt}\n`;
        });
        
        quizText += `\n━━━━━━━━━━━━━━━━━━\n` +
            `💡 Reply with the number (1-4)\n` +
            `⏱️ You have 60 seconds!\n\n` +
            `_Type your answer: 1, 2, 3, or 4_`;
        
        await sock.sendMessage(chatId, { text: quizText });
        
        // Store quiz data
        activeQuizzes.set(chatId, {
            question,
            startTime: Date.now()
        });
        
        // Set timeout
        setTimeout(() => {
            if (activeQuizzes.has(chatId)) {
                activeQuizzes.delete(chatId);
                sock.sendMessage(chatId, { 
                    text: `⏰ *Time's Up!*\n\n` +
                          `The correct answer was: *${question.options[question.answer]}*\n\n` +
                          `Try again with ${prefix}quiz!` 
                });
            }
        }, 60000);
    }
};

// Export function to check answers
export async function checkQuizAnswer(sock, m, answer) {
    const chatId = m.key.remoteJid;
    const quiz = activeQuizzes.get(chatId);
    
    if (!quiz) return false;
    
    const userAnswer = parseInt(answer) - 1;
    
    if (isNaN(userAnswer) || userAnswer < 0 || userAnswer > 3) {
        return false;
    }
    
    const timeTaken = ((Date.now() - quiz.startTime) / 1000).toFixed(1);
    const isCorrect = userAnswer === quiz.question.answer;
    
    activeQuizzes.delete(chatId);
    
    if (isCorrect) {
        const points = Math.max(100 - Math.floor(timeTaken * 2), 20);
        await sock.sendMessage(chatId, {
            text: `🎉 *CORRECT!*\n\n` +
                  `✅ Answer: ${quiz.question.options[quiz.question.answer]}\n` +
                  `⏱️ Time: ${timeTaken}s\n` +
                  `⭐ Points: ${points}\n\n` +
                  `━━━━━━━━━━━━━━━━━━\n` +
                  `Great job! Play again? 🎯`
        });
    } else {
        await sock.sendMessage(chatId, {
            text: `❌ *INCORRECT!*\n\n` +
                  `Your answer: ${quiz.question.options[userAnswer]}\n` +
                  `Correct answer: ${quiz.question.options[quiz.question.answer]}\n\n` +
                  `━━━━━━━━━━━━━━━━━━\n` +
                  `Don't give up! Try again! 💪`
        });
    }
    
    return true;
}
