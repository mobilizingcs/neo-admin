import React from 'react';

import {  Card,
          CardText,
          RaisedButton,
          Toolbar,
          ToolbarGroup,
          ToolbarTitle,
          Paper } from 'material-ui';

import css from './OutputConsole.css';

class OutputConsole extends React.Component {
  constructor( props ) {
    super( props );
  }

  formatOutput = ( output, key ) => {
    if( output.type === 'error' ) {
      return (
        <div className={css.error_div} key={key}>
          <span className={css.error_text}>
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
        <div className={css.message_div} key={key}>
          <span>{output.text}</span>
        </div>
      );
    }
  };

  render( ) {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={'Output Console'} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton onClick={this.props.onClearConsole} secondary={true} label="Clear Output Console"/>
          </ToolbarGroup>
        </Toolbar>
        <Card>
          <CardText>
            <Paper zDepth={2}>
              {this.props.output.map( this.formatOutput )}
            </Paper>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default OutputConsole;