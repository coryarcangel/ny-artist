import React from 'react';
import Chooser from "./Chooser"
class ControlPanel extends React.Component {
  constructor(props){
    super();
    this.addClef = this.addClef.bind(this);
    this.removeClef = this.removeClef.bind(this);
    this.clefConfig = this.clefConfig.bind(this);
    this.formChange = this.formChange.bind(this);
  }
  addClef(){
    var newClefs = this.props.options.clefs;
    newClefs.push(Object.create(newClefs[0]))
    this.props.update({clefs: newClefs})
  }
  removeClef(i){
    var newClefs = this.props.options.clefs;
    newClefs.splice(i,1)
    this.props.update({clefs: newClefs})
  }
  formChange(i,e){
    console.log("formchange",i)
    if(typeof i === "number"){
      var {clefs} = this.props.options;
      clefs[i][e.target.name] = e.target.value;
      this.props.update({clefs:clefs})
      }
    else {
      var update = {};
      update[e.target.name] = e.target.value;
      console.log("update",e.target)
      this.props.update(update)
    }
  }

  mainChange(e){
    var {options} = this.props;
    options[e.target.name] = e.target.value;
    this.props.update({options:options})
  }

  colorChange(i,j,e){
    var {clefs} = this.props.options;
    if(!e)
      return
    clefs[i]["colors"][j] = e.target.value;
    this.props.update({clefs:clefs})
  }

  chooserChange(i,j,value){
    var {clefs} = this.props.options;
    clefs[i][j] = value;
    this.props.update({clefs:clefs})
  }
  generateScore(){
    var {iterations} = this.props.options;
    this.props.update({iterations: iterations++})
  }
  hexToDecimalColor(number){
    return [
    (parseInt(number.slice(1,3),16)).toFixed(3),
    (parseInt(number.slice(3,5),16)).toFixed(3),
    (parseInt(number.slice(5,7),16)).toFixed(3)]
    // return number.toString(16).toUpperCase();
  }

  clefConfig(e,i){
    var converted_colors = e.colors.map((color)=>{
      return "rgba("+this.hexToDecimalColor(color).concat([.2]).join(",")+")";
    })
    return (
    <div className="control-clef" key={i}>
    <label htmlFor="title"><input name="title" className="clefTitle" onChange={(e) => this.formChange(i,e)} type="text" value={e.title}></input></label>
    <label htmlFor="maxMelodies">Melody Lines: 1<input className="maxMelodies" onChange={(e) => this.formChange(i,e)} type="range" name="maxMelodies" max={2} min={1} step={1} value={e.maxMelodies}></input>2</label>
    <label className="color-1" htmlFor="color-1">Color #1 <input onChange={(e) => this.colorChange(i,0,e)} onInput={(e) => this.colorChange(i,e)} type="color" name="colors-0" value={e.colors[0]}></input></label>
    { e.maxMelodies > 1? <label className="color-2" htmlFor="color-2">Color #2 <input onChange={(e) => this.colorChange(i,1,e)} onInput={(e) => this.colorChange(i,e)} type="color" name="colors-1" value={e.colors[1]}></input></label> : ""}
    <button onClick={() => this.removeClef(i)}>remove this clef</button>
    <span className="melodyControl" style={{"borderColor":e.colors[0]}}>
      <div className="melodyLabel">Melody 1</div>
      <label htmlFor="duration" className="fancySlider">Duration Range (in % of passage)<Chooser onChange={(e) => this.chooserChange(i,"durationRange1",e.update)} domain={[0, 50]} colors={[e.colors[1],e.colors[0]]} values={e.durationRange1}/></label>
      <label htmlFor="changeLimit" className="fancySlider">Melody Movement Range<Chooser onChange={(e) => this.chooserChange(i,"changeLimit1",e.update)} domain={[0, 20]} colors={[e.colors[1],e.colors[0]]} values={e.changeLimit1}/></label>
      <label htmlFor="restRange" className="fancySlider">Rest Length Range<Chooser onChange={(e) => this.chooserChange(i,"restRange1",e.update)} domain={[0, 50]} colors={[e.colors[1],e.colors[0]]} values={e.restRange1}/></label>
      <label htmlFor="melodyOccurrence1" className="fancySlider">Melody Occurrence 1<Chooser onChange={(e) => this.chooserChange(i,"melodyOccurrence1",e.update)} domain={[0, 100]} colors={[e.colors[1],e.colors[0]]} values={e.melodyOccurrence1}/></label>
      <label htmlFor="repeatNotes" className="simpleSlider repeatNotes">Repeat Notes: <br/>Never<input className="repeatNotes" onChange={(e) => this.formChange(i,e)} type="range" name="repeatNotes1" max={1} min={0} step={.01} value={e.repeatNotes1}></input>Always</label>
      <label htmlFor="restProbability" className="simpleSlider">Rest: <br/>Never<input className="restProbability" onChange={(e) => this.formChange(i,e)} type="range" name="restProbability1" max={1} min={0} step={.01} value={e.restProbability1}></input>Always</label>
    </span>
    {e.maxMelodies>1 ?
      <span className="melodyControl"  style={{"borderColor":e.colors[1]}}>
        <div className="melodyLabel">Melody 2</div>
        <label htmlFor="duration" className="fancySlider">Duration Range (in % of passage)<Chooser onChange={(e) => this.chooserChange(i,"durationRange2",e.update)} domain={[0, 50]} colors={e.colors} values={e.durationRange2}/></label>
        <label htmlFor="changeLimit" className="fancySlider">Melody Movement Range<Chooser onChange={(e) => this.chooserChange(i,"changeLimit2",e.update)} domain={[0, 20]} colors={e.colors} values={e.changeLimit2}/></label>
        <label htmlFor="restRange" className="fancySlider">Rest Length Range<Chooser onChange={(e) => this.chooserChange(i,"restRange2",e.update)} domain={[0, 50]} colors={e.colors} values={e.restRange2}/></label>
        <label htmlFor="melodyOccurrence2" className="fancySlider">Melody Occurrence 2<Chooser onChange={(e) => this.chooserChange(i,"melodyOccurrence2",e.update)} domain={[0, 100]} colors={e.colors} values={e.melodyOccurrence2}/></label>
        <label htmlFor="repeatNotes" className="simpleSlider repeatNotes">Repeat Notes: <br/>Never<input className="repeatNotes" onChange={(e) => this.formChange(i,e)} type="range" name="repeatNotes2" max={1} min={0} step={.01} value={e.repeatNotes2}></input>Always</label>
        <label htmlFor="restProbability" className="simpleSlider">Rest: <br/>Never<input className="restProbability" onChange={(e) => this.formChange(i,e)} type="range" name="restProbability2" max={1} min={0} step={.01} value={e.restProbability2}></input>Always</label>
      </span> : ""}
  </div>
  )
}
  clefSettings(){
    return (
      <div className="controls-clefs">
      <div className="main-controls">
      <label className="workTitle" htmlFor="workTitle">Title of Piece: <input name="title" onChange={(e) => this.mainChange(e)} type="text" value={this.props.options.title}></input></label>
        <label htmlFor="duration">Total duration<input onChange={(e) => this.mainChange(e)} type="range" name="duration" max={500} min={1} step={1} value={this.props.options.duration}></input> {this.props.options.duration} passages</label>
        <div  className={"add-clef"}><button onClick={this.addClef}>new clef</button></div>
      </div>
      {this.props.options.clefs.map(this.clefConfig)}
      </div>
    )
  }

  render(){
    return (
      <div className="controls">{this.clefSettings()}</div>
    );
  }
}

export default ControlPanel;
