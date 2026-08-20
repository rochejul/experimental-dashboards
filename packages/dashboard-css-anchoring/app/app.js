function setupApp() {
  let lastCursorPositionForBoxMovement = null;
  let lastBoxPosition = null;

  const bodyElement = document.querySelector('.app__body');
  const box1Element = document.querySelector('.box--one');

  bodyElement.addEventListener('pointermove', (event) => {
    console.log('Pointer moved in %s %s', event.offsetX, event.offsetY);

    if (lastBoxPosition) {
      console.info('We compute the box position');
      const diffX = Math.round(
        event.clientX - lastCursorPositionForBoxMovement.x,
      );
      const diffY = Math.round(
        event.clientY - lastCursorPositionForBoxMovement.y,
      );

      console.log('The box has moved from %s %s', diffX, diffY);

      box1Element.style = `left: ${lastBoxPosition.x + diffX}px; top: ${lastBoxPosition.y + diffY}px;`;
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

    const computedStyle = box1Element.computedStyleMap();
    lastBoxPosition = {
      x: computedStyle.get('left').value,
      y: computedStyle.get('top').value,
    };
  });

  box1Element.addEventListener('pointerup', (event) => {
    console.info('We stop to move the box');
    lastCursorPositionForBoxMovement = null;
    lastBoxPosition = null;
  });
}

setupApp();
