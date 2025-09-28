chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ sound: "click.mp3" });
});
