import React from 'react';
import { Staff, ControlPanel } from './';

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const randomColor = () => {
  let chars = "ABCDEF0123456789";
  let randomPart = chars.charAt(Math.floor(Math.random()*16))+chars.charAt(Math.floor(Math.random()*16));
  return "#"+shuffle([randomPart,"FF","00"]).join("");

}

let options = {
  title: "ny artist",
  test: 0,
  duration: 5,
  iterations: 0,
  clefs: [
      {
        title: "right hand",
        maxMelodies: 2,
        minMelodies: 1,
        durationRange: [10,30],
        repeatNotes: .1,
        changeLimit: [10,20],
        restRange: [1,3],
        restProbability: .5,
        melodyOccurrence1: [0,100],
        melodyOccurrence2: [0,100],
        colors: ["#4ccd00","#ff0062"]
      },
      {
        title: "left hand",
        maxMelodies: 2,
        minMelodies: 1,
        repeatNotes: .1,
        restProbability: .5,
        durationRange: [10,15],
        changeLimit: [10,20],
        restRange: [1,20],
        melodyOccurrence1: [0,100],
        melodyOccurrence2: [0,100],
        colors: ["#0e50fe","#f8ed00"]
      },
      {
        title: "feet",
        maxMelodies: 1,
        minMelodies: 1,
        durationRange: [3,10],
        repeatNotes: .3,
        changeLimit: [10,20],
        restRange: [10,20],
        restProbability: .5,
        melodyOccurrence1: [0,100],
        colors: [randomColor(),randomColor()]
      }
    ]
  }

class Home extends React.Component {
  constructor(props){
    super();
    this.state = options

    this.changeConfig = this.changeConfig.bind(this);
  }

  changeConfig(newConfig){
    this.setState(newConfig)
  }
  printData(){
    return (<div className="print-data">generated on {new Date().toString()}</div>)
  }
  score(count){
    let staffs = [];
    for (var i = 0; i < count; i++) {
      staffs.push(
        <div className="staffSet" key={i}>
          {options.clefs.map((e,j) => <Staff key={i*count+j} index={i} count={count} settings={e} />)}
        </div>
      )
    }
    return <div className="score">{staffs}</div>
  };

  render(){
    return (<div>
      <span className="title">"{this.state.title}" <span>/</span> <a href="" onClick={() => window.print()}>print</a></span>
      <ControlPanel options={this.state} update={this.changeConfig}/>
        {this.printData()}
        {this.score(this.state.duration)}
      </div>
    );
  }
}
export default Home;
