var Equalizer = {
  constDOM:{
    notesContainer: document.getElementById('notes'),
    timeline: document.getElementById('timeline'),
    playButton: document.getElementById('play'),
    saveButton: document.getElementById('save'),
    loadButton: document.getElementById('load'),
    clearButton: document.getElementById('clear'),
    fileReader: document.getElementById('file'),
    composition: document.getElementById('composition')
  },
  const:{
    DELAY: 25,
    CLEAR_TIMEOUT: 0
  },
  init(){
    Equalizer.constDOM.timeline.addEventListener('wheel', Equalizer.increaseTimelineWidth);
    Equalizer.constDOM.playButton.addEventListener('click', () => {Equalizer.playComposition(); Equalizer.saveInformation()} );
    Equalizer.constDOM.saveButton.addEventListener('click', Equalizer.saveCompostion);
    Equalizer.constDOM.loadButton.addEventListener('click', Equalizer.loadComposition);
    Equalizer.constDOM.clearButton.addEventListener('click', Equalizer.clear);
    Equalizer.constDOM.fileReader.addEventListener('change', Equalizer.getFile);
    Equalizer.constDOM.composition.addEventListener('dragover', Equalizer.preventDefault);
    Equalizer.constDOM.composition.addEventListener('drop', Equalizer.dropFile);

    Equalizer.yourComposition = [];

    Equalizer.showNotes();
  },
  saveInformation(){
    localStorage.timelineHTML = Equalizer.constDOM.timeline.innerHTML;
    localStorage.composition = JSON.stringify(Equalizer.yourComposition);
  },
  preventDefault(e){
     e.preventDefault();
  },
  dropFile(e){
     e.preventDefault();
     Equalizer.readFile(e.dataTransfer.files[0]);
  },
  getFile(){
    var file = Equalizer.constDOM.fileReader.files[0];
    Equalizer.readFile(file);
  },
  readFile(file){
    const reader = new FileReader();
    reader.onload = function(){
      Equalizer.constDOM.composition.value = this.result;
    }
    reader.readAsText(file);
  },
  loadNotes(path){
    return new Promise(function (resolve){
      var notes = new XMLHttpRequest();
      notes.open("GET", path, true)     
      notes.onload = function () {
        const data = this.responseText;
  
        resolve(JSON.parse(data)); 
      }
      notes.send(null);
    })
    
  },
  async showNotes(){
    const notes = await Equalizer.loadNotes('notes/notes.json');

    ul = document.createElement('ul');
    console.log(ul);
    var content = '';
    notes.forEach((note) => content += `<div class="${note.name} draggable">${note.name}
                                        <audio src="${note.sound}"></audio>
                                        </div>`
    )
    ul.innerHTML = content;
    console.log(Equalizer.constDOM.notesContainer);
    Equalizer.constDOM.notesContainer.appendChild(ul);
    Equalizer.constDOM.timeline.innerHTML = localStorage.timelineHTML;
    Equalizer.yourComposition = JSON.parse(localStorage.composition);
  },
  clear(){
    Equalizer.constDOM.timeline.innerHTML = '';
    Equalizer.yourComposition = [];
  },
  increaseTimelineWidth(){
    var lastWidth = parseInt(Equalizer.constDOM.timeline.style.width) || Equalizer.constDOM.timeline.clientWidth;
    lastWidth += 10;
    Equalizer.constDOM.timeline.style.width = lastWidth + 'px';
  },
  creatingComposition(note){
    Equalizer.yourComposition.push(note);
    console.log(Equalizer.yourComposition);
  },
  playComposition(){
    var timeBefore = Equalizer.const.DELAY - 50;
    var timeNow = Equalizer.const.DELAY - 25;
    var playNotes = setInterval(function(){
      timeBefore += Equalizer.const.DELAY;
      timeNow += Equalizer.const.DELAY;
      var playNow = Equalizer.yourComposition.filter( (number)=>
         (number.delay >= timeBefore && number.delay < timeNow)
      );
      Equalizer.enableSound(playNow);
    }, Equalizer.const.DELAY)
    
    setTimeout(function() {
    clearInterval(playNotes);
    console.log('completed')
    }, Equalizer.clearTime())
  },
  enableSound(notes){
    notes.forEach(function(note){
      console.log(note);
      var currentNote = document.createElement('audio');
      currentNote.setAttribute('src', note.sound);

      currentNote.play();
    })
  },
  clearTime(){
    Equalizer.const.CLEAR_TIMEOUT = Equalizer.yourComposition.reduce((prev, curr) => (prev.delay > curr.delay) ? prev : curr);
    console.log(Equalizer.const.CLEAR_TIMEOUT.delay + Equalizer.const.DELAY);
    return Equalizer.const.CLEAR_TIMEOUT.delay + Equalizer.const.DELAY;
  },
  saveCompostion(){
    Equalizer.constDOM.composition.innerText = JSON.stringify(Equalizer.yourComposition);
  },
  loadComposition(){
    console.log(composition.value);
    Equalizer.clear();
    Equalizer.yourComposition = JSON.parse(composition.value);
    
    var content = '';

    Equalizer.yourComposition.forEach((note) => content += `<div class="${note.name} + playable" style="position: absolute; 
                                                              left: ${note.left}; top: ${note.top};">${note.name}
                                                            <audio src="${note.sound}"></audio>
                                                            </div>`);
    Equalizer.constDOM.timeline.innerHTML = content;
    console.log(Equalizer.yourComposition);
  }
};

Equalizer.init();

DragManager.onDragCancel = function(dragObject) {
  dragObject.avatar.rollback();
};

DragManager.onDragEnd = function(dragObject, dropElem) {
  var timelineCoords = getCoords(Equalizer.constDOM.timeline);
  var currentNote = document.createElement('div');
  
  currentNote.setAttribute('class', `${dragObject.avatar.innerText} + playable`);
  currentNote.style.position = 'absolute';
  currentNote.style.left = parseInt(dragObject.avatar.style.left) - timelineCoords.left + 'px';
  currentNote.style.top = parseInt(dragObject.avatar.style.top) - timelineCoords.top + 'px';

  currentNote.innerHTML = dragObject.copy.innerHTML;

  dropElem.appendChild(currentNote);

  Equalizer.creatingComposition({name: dragObject.avatar.innerText,
                                 delay: parseInt(currentNote.style.left), 
                                 sound: dragObject.copy.children[0].getAttribute('src'),
                                 left: parseInt(dragObject.avatar.style.left) - timelineCoords.left + 'px',
                                 top: parseInt(dragObject.avatar.style.top) - timelineCoords.top + 'px'});
  dragObject.avatar.rollback();

  console.log(dragObject.copy);
};

function getCoords(elem) { 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}