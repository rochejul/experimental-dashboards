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

  const left = box1Element.clientWidth / 2 + box1Position.x < box2Position.x;
  const top = box1Element.clientHeight / 2 + box1Position.y < box2Position.y;

  return { left, top };
}

function updateLinkClassSet(linkElement, { left, top }) {
  linkElement.classList.remove(
    'link--on-right-top',
    'link--on-left-bottom',
    'link--left-top',
    'link--left-bottom',
    'link--right-top',
    'link--right-bottom',
  );

  if (left & top) {
    linkElement.classList.add('link--left-top');
  } else if (left & !top) {
    linkElement.classList.add('link--left-bottom', 'link--on-left-bottom');
  } else if (!left & top) {
    linkElement.classList.add('link--right-top', 'link--on-right-top');
  } else if (!left & !top) {
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

  const box2Position = getBoxPosition(box2Element);

  bodyElement.addEventListener('pointermove', (event) => {
    console.log('Pointer moved in %s %s', event.offsetX, event.offsetY);

    if (lastBox1Position) {
      console.info('We compute the box position');
      const diffX = Math.round(
        event.clientX - lastCursorPositionForBoxMovement.x,
      );
      const diffY = Math.round(
        event.clientY - lastCursorPositionForBoxMovement.y,
      );

      console.log('The box has moved from %s %s', diffX, diffY);

      box1Element.style = `left: ${lastBox1Position.x + diffX}px; top: ${lastBox1Position.y + diffY}px;`;
      updateLink(linkElement, box1Element, box2Element);
    }
  });

  box1Element.addEventListener('pointerdown', (event) => {
    console.info(
      'We will start to move the box from pointer position %s %s',
      event.clientX,
      event.clientY,
    );

    lastCursorPositionForBoxMovement = {
      x: event.clientX,
      y: event.clientY,
    };

    lastBox1Position = getBoxPosition(box1Element);
  });

  box1Element.addEventListener('pointerup', (event) => {
    console.info('We stop to move the box');
    lastCursorPositionForBoxMovement = null;
    lastBox1Position = null;
  });

  updateLink(linkElement, box1Element, box2Element);
}

setupApp();
