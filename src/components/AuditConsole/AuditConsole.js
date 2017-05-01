import React from 'react';
import { connect } from 'react-redux';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/textmate';

import AuditConsoleToolbar from './AuditConsoleToolbar';
import OutputConsole from './OutputConsole';
import { fetchLocalLogsState, clearLocalLogs } from '../../actions/auditconsole';
import { flashNotification } from '../../actions/notification';

import FileSaver from 'file-saver';

class AuditConsole extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      code: '',
      output: [ ]
    };
    this.worker;
  }

  componentDidMount() {
    if( !this.props.local_state.is_fetched ) {
      this.props.dispatch( fetchLocalLogsState( ) );
    }
  }

  clearLocalLogs = ( ) => {
    this.props.dispatch( clearLocalLogs( ) );
  };

  updateCode = ( value ) => {
    this.setState( {
      code: value
    } );
  };

  logToOutputConsole = ( text, type, lineno, colno ) => {
    this.setState( {
      output: this.state.output.concat( [ { text, lineno, colno, type } ] )
    } );
  };

  clearOutputConsole = ( ) => {
    this.setState( {
      output: [ ]
    } );
  };

  obtainCode = ( for_execution = true ) => {
    if ( this.state.code.trim( ) === '' ) {
      return '';
    }
    const code = [ ];
    for_execution ? code.push( '(function(){' ) : null;
    code.push( this.state.code );
    for_execution ? code.push( '})()' ) : null;
    let blob = new Blob( code, {type: 'application/javascript'} );
    return blob;
  };

  saveCodeAsAFile = ( ) => {
    const code_blob = this.obtainCode( false );
    if( code_blob === '' ) {
      this.props.dispatch( flashNotification( 'There is no code to save.' )  );
      return false;
    }
    FileSaver.saveAs( code_blob, 'audit.js' );
  }

  executeCode = ( ) => {
    const code_blob = window.URL.createObjectURL( this.obtainCode( ) );

    this.worker = new Worker( code_blob  );

    this.worker.onerror = error => {
      this.logToOutputConsole( error.message, 'error', error.lineno, error.colno );
    };
    this.worker.onmessage = message => {
      if( message.data.type === 'output_console' ) {
        const { text, type, lineno, colno } = message.data.data;
        this.logToOutputConsole( text, type, lineno, colno );
      }
    };

    window.URL.revokeObjectURL( code_blob );
  };

  render( ) {
    const { local_state } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs>
              <AuditConsoleToolbar  onClickExecute={this.executeCode}
                                    onClickClearLogs={this.clearLocalLogs}
                                    onClickSaveFile={this.saveCodeAsAFile}
                                    count={local_state.state.count} />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <AceEditor  fontSize={20}
                          tabSize={2}
                          value={this.state.code}
                          onChange={this.updateCode}
                          width="100%"
                          height="300px"
                          mode="javascript"
                          theme="textmate"
                          name="code_editor" />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <OutputConsole onClearConsole={this.clearOutputConsole} output={this.state.output} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { auditConsole } = state;
  return {
    local_state: auditConsole.local_state
  }
}

export default connect(mapStateToProps)(AuditConsole);