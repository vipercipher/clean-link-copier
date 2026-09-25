const TRACKING = ["utm_source", "utm_medium", "utm_campaign", "utm_term",
                  "utm_content", "fbclid", "gclid", "igshid", "mc_cid", "mc_eid"];

document.getElementById("copy").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  TRACKING.forEach(param => url.searchParams.delete(param));
  await navigator.clipboard.writeText(url.toString());
  document.getElementById("status").textContent = "Copied: " + url.toString();
});