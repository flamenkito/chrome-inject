console.log('[ outlook.js ] start');

const config = {
  interval: 100,
  maxTries: 100,
};

const run = (callback) => {
  return new Promise((resolve, reject) => {
    let count = 0;

    const handler = setInterval(() => {
      const result = callback();

      if (result) {
        clearInterval(handler);
        resolve(result);
      }

      if (count++ > config.maxTries) {
        clearInterval(handler);
        reject();
      }
    }, config.interval);
  });
};

const removeFromBar = () => {
  const bar = document.querySelector('.ms-FocusZone.customScrollBar')?.parentElement;

  if (bar?.children.length === 3 && bar.children[1].innerText.includes('Get the latest premium Outlook features')) {
    bar.removeChild(bar.lastChild);
    bar.removeChild(bar.lastChild);
    console.log('[ outlook.js ] removed from bar.');
    return true;
  }
};

const removeFromContent = () => {
  const el = document.querySelector('[data-app-section="NavigationPane"]')?.parentElement.lastChild;

  if (el?.innerText.includes('It looks like you\'re using an ad blocker')) {
    el.remove();
    console.log('[ outlook.js ] removed from content.');
    return true;
  }
};

const removeFromMain = () => {
  const el = document.getElementById('MainModule')?.nextElementSibling;

  if (el?.innerText.includes('It looks like you\'re using an ad blocker')) {
    el.remove();
    console.log('[ outlook.js ] removed from main.');
    return true;
  }
};

const main = async () => {
  return Promise.race([
    run(removeFromContent),
    run(removeFromMain),
    run(removeFromBar),
  ]);
};

main()
  .then(res => {
    console.log('[ outlook.js ] OK', res);
  })
  .catch(err => {
    console.error('[ outlook.js ] ERROR', err);
  });

// const bar = document.querySelector('.ms-FocusZone.customScrollBar').parentElement;
// console.log('[ outlook.js ]', bar.children.length);


// const main = document.getElementById('MainModule');
// console.log('[ outlook.js ]', main.children.length);

// main.parentElement.removeChild(main.nextSibling);
