// ===== CONFIGURATION =====
// TODO: Update this with the client's target launch date
// Format: new Date('YYYY-MM-DD HH:MM:SS')
// Example: new Date('2025-06-15 09:00:00')

// Placeholder: 3.5 months from now
const targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() + 3);
targetDate.setDate(targetDate.getDate() + 15);

// Or use a specific date (recommended):
// const targetDate = new Date('2025-06-15 00:00:00').getTime();
const targetTimestamp = targetDate.getTime();

// ===== COUNTDOWN LOGIC =====
function updateCountdown() {
    const now = Date.now();
    const difference = targetTimestamp - now;

    // Check if countdown has finished
    if (difference <= 0) {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('launched').style.display = 'block';
        return;
    }

    // Calculate time units
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Update display with zero-padding
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Initialize countdown immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);
