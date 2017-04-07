import React from 'react';

import {  Card,
          CardActions,
          CardHeader,
          CardText,
          RaisedButton,
          Chip,
          Paper } from 'material-ui';

import { red900, red50 } from 'material-ui/styles/colors';

class OutputConsole extends React.Component {
  constructor( props ) {
    super( props );

    this.styles = {
      error_div: {
        backgroundColor: red50,
        padding: '5px 8px',
        borderBottom: '1px solid rgb(224, 224, 224)'
      },
      error_text: {
        color: red900,
        padding: '15px 0px'
      },
      message_div: {
        'padding': '5px 8px',
        'border-bottom': '1px solid rgb(224, 224, 224)'
      }
    };
  }

  formatOutput = ( output, key ) => {
    // todo: change the css to be more modular! (use css-modules/postcss)
    if( output.type === 'error' ) {
      return (
        <div style={this.styles.error_div} key={key}>
          <span style={this.styles.error_text}>
            {
              !!output.lineno && !!output.colno
              ? ('[L' + output.lineno + ':' + output.colno + '] ' + output.text)
              : output.text}
          </span>
        </div>
      );
    }
    else {
      return (
        <div style={this.styles.message_div} key={key}>
          <span>{output.text}</span>
        </div>
      );
    }
  };

  render( ) {
    return (
      <Card>
        <CardHeader title={<Chip>Console Output</Chip>}
                    actAsExpander={false} />
        <CardActions>
          <RaisedButton onClick={this.props.onClearConsole} label="Clear Output Console"/>
        </CardActions>
        <CardText>
          <Paper zDepth={2}>
          {this.props.output.map( this.formatOutput )}
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default OutputConsole;