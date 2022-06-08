chrome.runtime.onInstalled.addListener(() => {
  console.log('[ onInstalled ]');
});

const scripts = {
  'https://outlook.live.com/mail': './scripts/outlook.js',
};

const getScript = (tab) => {
  if (typeof tab?.url !== 'string') {
    return;
  }

  for (const [url, script] of Object.entries(scripts)) {
    if (tab.url.startsWith(url)) {
      return script;
    }
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const script = getScript(tab);

    if (!script) {
      return;
    }

    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: [script],
    })
      .then(() => {
        console.log('[ onUpdated ] injected ' + script);
      })
      .catch(err => console.log(err));
  }
});
