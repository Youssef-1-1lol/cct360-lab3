// Both narratives reuse the exact same three image files.
const images = {
  letter: { src: 'images/letter.svg', alt: 'An opened letter and its envelope resting on a wooden table.' },
  meeting: { src: 'images/meeting.svg', alt: 'Two people facing each other on a quiet railway platform.' },
  platform: { src: 'images/platform.svg', alt: 'An empty railway platform with a bench and tracks disappearing into the distance.' }
};
const sequences = {
  reunion: {
    title: 'Some words bring us back.',
    description: 'An invitation turns distance into a new beginning.',
    frames: [
      { image: 'platform', title: 'The waiting', caption: 'An empty platform. Someone is missing.' },
      { image: 'letter', title: 'The invitation', caption: 'A letter arrives: “Meet me where we began.”' },
      { image: 'meeting', title: 'The return', caption: 'At last, the distance between them closes.' }
    ],
    reading: 'The empty platform establishes an absence. The letter offers a way back. With the meeting as the final image, we read the sequence as a reunion: loneliness becomes hope, and hope becomes connection.'
  },
  farewell: {
    title: 'Some words let us go.',
    description: 'A last meeting becomes a memory of what was.',
    frames: [
      { image: 'meeting', title: 'The last meeting', caption: 'They meet at the place they once knew.' },
      { image: 'letter', title: 'The goodbye', caption: 'The words they couldn’t say are left on paper.' },
      { image: 'platform', title: 'The absence', caption: 'The platform is empty. This time, for good.' }
    ],
    reading: 'The meeting now comes first, so the letter feels like its aftermath. Ending on the empty platform turns the same location into a symbol of loss. Connection becomes farewell, and farewell leaves an absence.'
  }
};
const stages = ['Beginning', 'Middle', 'End'];
let currentSequence = 'reunion';
let currentFrame = 0;
let playbackTimer = null;
const framesContainer = document.querySelector('#frames');
const playButton = document.querySelector('#play');

function selectFrame(index) {
  currentFrame = (index + 3) % 3;
  document.querySelectorAll('.frame').forEach((frame, position) => {
    frame.classList.toggle('selected', position === currentFrame);
    frame.setAttribute('aria-pressed', String(position === currentFrame));
  });
  document.querySelector('#progress').textContent = `FRAME 0${currentFrame + 1} OF 03 — ${stages[currentFrame].toUpperCase()}`;
}

function stopPlayback() {
  clearInterval(playbackTimer);
  playbackTimer = null;
  playButton.innerHTML = 'Play sequence <span>▶</span>';
  playButton.setAttribute('aria-pressed', 'false');
}

function renderSequence(name) {
  stopPlayback();
  currentSequence = name;
  const sequence = sequences[currentSequence];
  document.querySelector('#story-title').textContent = sequence.title;
  document.querySelector('#story-description').textContent = sequence.description;
  document.querySelector('#interpretation').textContent = sequence.reading;
  document.querySelectorAll('.tab').forEach(tab => {
    const active = tab.dataset.sequence === currentSequence;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  framesContainer.replaceChildren();
  sequence.frames.forEach((frame, index) => {
    const image = images[frame.image];
    const button = document.createElement('button');
    button.className = 'frame';
    button.setAttribute('aria-label', `${stages[index]}: ${frame.title}`);
    button.innerHTML = `<div class="image-wrap"><img src="${image.src}" alt="${image.alt}"><span class="frame-number">0${index + 1}</span></div><span class="frame-stage">${stages[index].toUpperCase()}</span><span class="frame-title">${frame.title}</span><span class="frame-caption">${frame.caption}</span>`;
    button.addEventListener('click', () => { stopPlayback(); selectFrame(index); });
    framesContainer.append(button);
  });
  selectFrame(0);
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => renderSequence(tab.dataset.sequence));
});
renderSequence(currentSequence);
