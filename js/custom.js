var pane = document.querySelectorAll('.pane');
var card = document.querySelectorAll('.cardRow .card');
var dragSrcEl;

function handleDragStart(e) {
  this.style.opacity = '0.25';

  dragSrcEl = this.parentNode;
  this.classList.add('dragging');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');

}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDragEnd(e) {
  this.style.opacity = '1.0';

  Array.prototype.forEach.call(card, function(t) {
    t.classList.remove('dragging');
    t.classList.remove('over');
  });
}


function handleDropOntoCard(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl !== this.parentNode) {
    dragSrcEl.parentNode.removeChild(dragSrcEl);
    this.parentNode.parentNode.appendChild(dragSrcEl);
  }

  return false;
}

function handleDropOntoPane(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  dragSrcEl.parentNode.removeChild(dragSrcEl);
  this.appendChild(dragSrcEl);
  return false;
}


Array.prototype.forEach.call(pane, function(p) {

  p.addEventListener('dragover', handleDragStart);
  p.addEventListener('dragenter', handleDragEnd);
});

Array.prototype.forEach.call(card, function(p) {
  p.addEventListener('dragover', handleDragOver);
  p.addEventListener('dragleave', handleDragLeave);
  p.addEventListener('drop', handleDropOntoCard);
  p.addEventListener('dragenter', handleDragEnter);
  p.addEventListener('drop', handleDropOntoPane);

});
