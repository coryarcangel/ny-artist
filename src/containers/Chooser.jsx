import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle, Track, Tick } from './SliderParts';
let sliderStyle = {
  position: 'relative',
  width: '100%',
}

let railStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  cursor: 'pointer',
  border:' solid black 1px',
  boxSizing: "border-box",
  backgroundColor: 'white',
}

const domain = [100, 500]
const defaultValues = [160, 300, 400, 440]

class Chooser extends Component {
  constructor(props){
    super();
    this.state = {
      ...props
    }
  }

  onUpdate = update => {
    this.props.onChange({ update })
    // this.setState({ update })
  }

  onChange = values => {
    // this.props.onChange({ values })
  }

  render() {
    const { state: { values, update, domain } } = this

    return (
      <div style={{ height: 30, width: '100%' }}>
        <Slider
          mode={3}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    divOrButton="button"
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    color={this.props.colors[0]}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    color={this.props.colors[1]}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Chooser
