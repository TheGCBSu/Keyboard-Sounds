function playClick() {
  chrome.storage.local.get(["customSounds", "selectedSoundId"], (data) => {
    let soundPath;
    const customSounds = data.customSounds || [];
    const selectedSoundId = data.selectedSoundId || "default";

    if (selectedSoundId === "default") {
      soundPath = chrome.runtime.getURL("sounds/click.mp3");
    } else {
      const index = parseInt(selectedSoundId.replace("custom-", ""), 10);
      if (customSounds[index]) {
        soundPath = customSounds[index].data; // base64
      } else {
        soundPath = chrome.runtime.getURL("sounds/click.wav"); // fallback
      }
    }

    const audio = new Audio(soundPath);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  });
}

document.addEventListener("keydown", (e) => {
  if (!["Shift", "Control", "Alt"].includes(e.key)) {
    playClick();
  }
});
