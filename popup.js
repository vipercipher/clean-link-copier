const TRACKING = ["utm_source", "utm_medium", "utm_campaign", "utm_term",
                  "utm_content", "fbclid", "gclid", "igshid", "mc_cid", "mc_eid"];

const status = document.getElementById("status");

document.getElementById("copy").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith("http")) {
      status.textContent = "This page can't be copied.";
      return;
    }

    const url = new URL(tab.url);

    const before = url.searchParams.toString();
    TRACKING.forEach(param => url.searchParams.delete(param));
    const removed = before !== url.searchParams.toString();

    await navigator.clipboard.writeText(url.toString());
    status.textContent = (removed ? "Cleaned & copied: " : "Already clean, copied: ") + url.toString();
  } catch (err) {
    status.textContent = "Something went wrong: " + err.message;
  }
});