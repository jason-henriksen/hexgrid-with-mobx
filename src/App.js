import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils } from 'react-hexgrid';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import './App.css';

import configs from './configurations'; // load the grid templates

@observer class App extends Component {

  @observable goalTemplate = 'hexagon';  // hold the currently selected template

  constructor(props) {
    super(props);
    this.changeType = this.changeType.bind(this);
  }

  changeType(event) {
    // set a new goal template.
    this.goalTemplate = event.currentTarget.value;
    // trust that the @computed method will re-generate the hexagons and then re-render
  }

  render() {
    // automatically re-renders every time this.goalTemplate is changed.
    const curConfig = configs[this.goalTemplate];
    const layout = curConfig.layout;
    const size = {x: layout.width, y: layout.height };

    const generator = GridGenerator[this.goalTemplate]; // generator thing
    const hexagons = generator.apply(null,curConfig.mapProps);  // build hexagon list
    
    return (
      <div className="App">
          <h2>Select grid type and configuration from dropdown.</h2>
          <div>
            <strong>Template: </strong><select onChange={(ev) => this.changeType(ev)}>
              <option name="hexagon">hexagon</option>
              <option name="triangle">triangle</option>
              <option name="parallelogram">parallelogram</option>
              <option name="rectangle">rectangle</option>
              <option name="orientedRectangle">orientedRectangle</option>
            </select>
          </div>
          <hr />
        <HexGrid width={curConfig.width} height={curConfig.height} >
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={curConfig.origin}>
              {
                // note that key is different from the original example!
                hexagons.map((hex, i) => (
                <Hexagon key={this.goalTemplate+'.'+i} q={hex.q} r={hex.r} s={hex.s}>
                    <Text>{HexUtils.getID(hex)}</Text>
                  </Hexagon>
                ))
              }
            </Layout>
          </HexGrid>
      </div>
    );
  }
}

export default App;
