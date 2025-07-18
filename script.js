function copyToClipboard(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

// --- Fixed 3-Hour Window Timer ---
function getCurrentWindowStart() {
  const now = new Date();
  const hours = now.getHours();
  const windowStartHour = Math.floor(hours / 3) * 3; // 0, 3, 6, 9...
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), windowStartHour, 0, 0);
  return start;
}

function getWindowEnd() {
  const start = getCurrentWindowStart();
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3hr
  return end;
}

function updateCountdown() {
  const now = new Date();
  const end = getWindowEnd();
  const diff = Math.max(0, end - now); // ms
  const minutes = Math.floor(diff / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  document.getElementById('countdown').textContent = ${minutes}m ${seconds}s;

  if (diff <= 0) {
    location.reload(); // auto refresh for new lab session
  }
}

setInterval(updateCountdown, 1000);
