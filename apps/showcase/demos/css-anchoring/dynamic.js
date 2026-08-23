function getBoxPosition(element) {
  const computedStyle = element.computedStyleMap();

  return {
    x: computedStyle.get('left').value,
    y: computedStyle.get('top').value,
  };
}

function getBox1PositionToBox2(box1Element, box2Element) {
  const box1Position = getBoxPosition(box1Element);
  const box2Position = getBoxPosition(box2Element);

  const left =
    box1Element.clientWidth / 2 + box1Position.x <
    box2Position.x + box2Element.clientWidth / 2;
  const top =
    box1Element.clientHeight / 2 + box1Position.y <
    box2Position.y + box2Element.clientHeight / 2;

  const above =
    box2Position.x - box2Element.clientWidth <
      box1Position.x + box1Element.clientWidth &&
    box1Position.x + box1Element.clientWidth <
      box2Position.x + box2Element.clientWidth * 2 &&
    box1Position.y + box1Element.clientHeight < box2Position.y;

  const below =
    box2Position.x - box2Element.clientWidth <
      box1Position.x + box1Element.clientWidth &&
    box1Position.x + box1Element.clientWidth <
      box2Position.x + box2Element.clientWidth * 2 &&
    box2Position.y + box2Element.clientHeight <
      box1Position.y + box1Element.clientHeight;

  return { left, top, above, below };
}

function updateLinkClassSet(linkElement, { left, top, above, below }) {
  linkElement.classList.remove(
    'link--on-right-top',
    'link--on-left-bottom',
    'link--left-top',
    'link--left-bottom',
    'link--right-top',
    'link--right-bottom',
    'link--on-above',
    'link--on-above-right',
    'link--on-below',
    'link--on-below-right',
  );

  if (left && above) {
    linkElement.classList.add('link--on-above');
  } else if (!left && above) {
    linkElement.classList.add('link--on-above-right');
  } else if (left && below) {
    linkElement.classList.add('link--on-below');
  } else if (!left && below) {
    linkElement.classList.add('link--on-below-right');
  } else if (left && top) {
    linkElement.classList.add('link--left-top');
  } else if (left && !top) {
    linkElement.classList.add('link--left-bottom', 'link--on-left-bottom');
  } else if (!left && top) {
    linkElement.classList.add('link--right-top', 'link--on-right-top');
  } else if (!left && !top) {
    linkElement.classList.add('link--right-bottom');
  }
}

function updateLink(linkElement, box1Element, box2Element) {
  const position = getBox1PositionToBox2(box1Element, box2Element);

  updateLinkClassSet(linkElement, position);
}

function setupApp() {
  let lastCursorPositionForBoxMovement = null;
  let lastBox1Position = null;

  const bodyElement = document.querySelector('.app__body');
  const box1Element = document.querySelector('.box--one');
  const box2Element = document.querySelector('.box--second');
  const linkElement = document.querySelector('.link');

  bodyElement.addEventListener('pointermove', (event) => {
    if (lastBox1Position) {
      const diffX = Math.round(
        event.clientX - lastCursorPositionForBoxMovement.x,
      );
      const diffY = Math.round(
        event.clientY - lastCursorPositionForBoxMovement.y,
      );

      box1Element.style.left = `${lastBox1Position.x + diffX}px`;
      box1Element.style.top = `${lastBox1Position.y + diffY}px`;
      updateLink(linkElement, box1Element, box2Element);
    }
  });

  box1Element.addEventListener('pointerdown', (event) => {
    lastCursorPositionForBoxMovement = {
      x: event.clientX,
      y: event.clientY,
    };

    lastBox1Position = getBoxPosition(box1Element);
  });

  box1Element.addEventListener('pointerup', () => {
    lastCursorPositionForBoxMovement = null;
    lastBox1Position = null;
  });

  updateLink(linkElement, box1Element, box2Element);
}

setupApp();
