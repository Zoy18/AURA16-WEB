const VALID_PROMOS = ["YOLO2.0", "MYSLL1"];

// Replace with your Telegram Username (without @)
const TELEGRAM_USERNAME = "Aura16Burmar";

function checkPromo() {
    const input = document.getElementById('promo-input').value.trim().toUpperCase();
    const message = document.getElementById('message');

    if (VALID_PROMOS.includes(input)) {
        message.style.color = "green";
        message.innerText = "✓ Valid Promo Code! Generating your verification code...";
        
        // Generate a new unique verification code
        const newCode = generateVerificationCode();
        
        // Save to local storage for Admin to check (simulating a database)
        saveCodeToHistory(newCode);

        // Show Success Modal
        setTimeout(() => {
            showSuccess(newCode);
        }, 500);
    } else {
        message.style.color = "red";
        message.innerText = "✗ Invalid Promo Code. Please try again.";
    }
}

function generateVerificationCode() {
    // Generate a code like "DISCOUNT-123456"
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `DISCOUNT-${randomNum}`;
}

function saveCodeToHistory(code) {
    let codes = JSON.parse(localStorage.getItem('generated_codes')) || [];
    codes.push({
        code: code,
        timestamp: new Date().toLocaleString(),
        status: "Valid",
        used: false
    });
    localStorage.setItem('generated_codes', JSON.stringify(codes));
}

function showSuccess(code) {
    const overlay = document.getElementById('success-overlay');
    const codeDisplay = document.getElementById('generated-code');
    const countdownDisplay = document.getElementById('countdown');
    
    codeDisplay.innerText = code;
    overlay.style.display = "flex";

    let timeLeft = 10; // 10 seconds for screenshot
    const timer = setInterval(() => {
        timeLeft--;
        countdownDisplay.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Redirect to Telegram with the code pre-filled
            redirectToTelegram(code);
        }
    }, 1000);
}

function redirectToTelegram(code) {
    // Create Telegram URL with pre-filled message
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(code )}`;
    window.location.href = telegramUrl;
}

function copyCode() {
    const code = document.getElementById('generated-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy code');
    });
}
