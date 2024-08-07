chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "💡",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);

    chrome.storage.local.set({ selectedText: selectedText }, () => {
      console.log("Selected text saved to local storage");

      // Open the side panel
      chrome.sidePanel.open({ windowId: tab!.windowId });
    });
  }
});
