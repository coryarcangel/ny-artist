import React from 'react';

let sample = {
  title: "feet",
  maxMelodies: 2,
  minMelodies: 1,
  durationRange: [1,60],
  changeLimit: 10,
  restRange: [1,20],
  restProbability: .1,
}
let melodies = [];
const num = (range) => Math.floor(Math.random()*range);
let randomDuration = (range) => {
  return range[0] + num(range[1]-range[0]);
}
class Staff extends React.Component {
  constructor(props){
    super();
    this.state = {
      score: {}
    }
  }

  noteStyle(note){
    return {
      filter: "hue-rotate("+num(20)-10+"deg)",
      backgroundColor : this.props.settings.colors[note.index],
      left: note.time+"%",
      width: note.duration+"%",
      top: (note.note -2)+"%",
      height: "5%"
    }
  }

  potentialNote(melodies,i){
    if(Math.random()<this.props.settings.repeatNotes)
      return melodies[i][melodies[i].length-1].note;
    let max = this.props.settings.changeLimit[1];
    let min = this.props.settings.changeLimit[0];
    let range = max-min;
    return melodies[i][melodies[i].length-1].note + [-1,1][num(2)]*(num(range)+min);
  }

  getNote(melodies,time,i,duration){
    let settings = this.props.settings;
    let melodySpace = (100/settings.maxMelodies);
    let starter = num(melodySpace)+(100/settings.maxMelodies)*i;
    let attempts = 0;
    let nextNote = melodies[i].length === 0 ? starter :
    this.potentialNote(melodies,i);
    while((!this.checkNote(melodies,nextNote,time,i,duration) || (nextNote <0 || nextNote > 100)) && attempts < 100){
      nextNote = melodies[i].length === 0 ? starter :
      this.potentialNote(melodies,i);
      attempts++;
    }
    (nextNote<0) && (nextNote = 0);
    (nextNote>100) && (nextNote = 100);
    return nextNote;
  }

  checkNote(melodies,nextNote,time,i,duration){
    var compareMelody = melodies[(i+1)%melodies.length];
    if(compareMelody && compareMelody.length){
      var intersects = compareMelody.filter(function(e,i){
        return (e.time >= time && e.time <= time+duration) || (time >= e.time && time <= e.time+e.duration) ||
          (e.time+e.duration >= time && e.time+e.duration <= time+duration) || (time+duration >= e.time && time+duration <= e.time+e.duration)
      })
      if(intersects && intersects.length)
      for (var j = 0; j < intersects.length; j++) {
        if(i===0){
          if(nextNote >= intersects[j].note){
            return false
          }
        }
        else {
          if(nextNote <= intersects[j].note){
            return false
          }
        }
      }
    }
    return true;
  }
  generateClef(settings){
    let melodies = [[],[]];
    let register = {};
    //moves to the next note, but if it's the first note we just start in its area.
    var status = [0,0];
    while(status[0]<100 || status[1]<100){
      for (var i = 0; i < settings.maxMelodies; i++) {
        var rest = Math.random()<settings.restProbability;
        var duration = randomDuration(settings[rest ? "restRange" : "durationRange" ]);
        var proposedNote = {
          index: i,
          note: this.getNote(melodies,status[i],i,duration),
          duration: duration,
          time: status[i]
        }
        !(proposedNote.note in register) && (register[proposedNote.note.toString()] = []);
        register[proposedNote.note.toString()].push([status[i],duration]);
        if(!rest)
          melodies[i].push(proposedNote);
        status[i] += duration;
      }
    }
    return melodies;
  }

  componentDidMount(){
    melodies = this.generateClef(this.props.settings);
  }

  renderClef(){
    let melodies = this.generateClef(this.props.settings);
    return melodies.map((melody,i) =>
    (<div className="melody" key={i}>
      {melody.map((note,j) => (
        <div className="note" key={j} style={this.noteStyle(note)}></div>
      ))}
    </div>)
  );

  }

  render(){
    return (
      <div className="staff"><div className="clef-title">{this.props.settings.title}</div><div className="melodies">{this.renderClef()}</div></div>
    );
  }
}

export default Staff;
