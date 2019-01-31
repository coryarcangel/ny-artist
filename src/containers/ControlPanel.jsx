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
    console.log(e)
    var {clefs} = this.props.options;
    clefs[i][e.target.name] = e.target.value;
    this.props.update({clefs:clefs})
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
    console.log(i,j,value)
    var {clefs} = this.props.options;
    console.log(clefs[i],j,value)

    clefs[i][j] = value;
    this.props.update({clefs:clefs})
  }
  clefConfig(e,i){
    return (
    <div className="control-clef" key={i}>
      <label htmlFor="title">Clef Name:<input onChange={this.formChange} type="text" value={e.title}></input></label>
      <label htmlFor="repeatNotes">Repeat Notes: <br/>Never<input className="repeatNotes" onChange={(e) => this.formChange(i,e)} type="range" name="repeatNotes" max={1} min={0} step={.01} value={e.repeatNotes}></input>Always</label>
      <label htmlFor="restProbability">Rest: <br/>Never<input className="restProbability" onChange={(e) => this.formChange(i,e)} type="range" name="restProbability" max={1} min={0} step={.01} value={e.restProbability}></input>Always</label>
      <label htmlFor="duration">Duration Range (in % of passage)<Chooser onChange={(e) => this.chooserChange(i,"durationRange",e.update)} domain={[0, 50]} colors={e.colors} values={e.durationRange}/></label>
      <label htmlFor="changeLimit">Melody Movement Range<Chooser onChange={(e) => this.chooserChange(i,"changeLimit",e.update)} domain={[0, 20]} colors={e.colors} values={e.changeLimit}/></label>
      <label htmlFor="restRange">Rest Length Range<Chooser onChange={(e) => this.chooserChange(i,"restRange",e.update)} domain={[0, 50]} colors={e.colors} values={e.restRange}/></label>
      <label className="color-1" htmlFor="color-1">Color #1<input onChange={(e) => this.colorChange(i,0,e)} onInput={(e) => this.colorChange(i,e)} type="color" name="colors-0" value={e.colors[0]}></input></label>
      <button onClick={() => this.removeClef(i)}>remove</button>
    </div>
    )
}
  clefSettings(){
    return (
      <div className="controls-clefs">
      <div className="main-controls">
        <label htmlFor="duration">Total duration<input onChange={(e) => this.mainChange(e)} type="range" name="duration" max={50} min={1} step={1} value={this.props.options.duration}></input>{this.props.options.duration} passages</label>
        <div  className={"add-clef"}><button onClick={this.addClef}>add a clef</button></div>
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
