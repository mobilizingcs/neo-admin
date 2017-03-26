import React from 'react';
import { connect } from 'react-redux';

import { ProgressBar } from 'react-mdl';

class AppProgressBar extends React.Component {
  constructor( ) {
    super( );
  }

  render( ) {
    return (
      <ProgressBar style={ { 'width': '100%', visibility: this.props.progress_bar.is_visible ? 'visible' : 'hidden' } }
        progress={ this.props.progress_bar.progress > 0 ? this.props.progress_bar.progress : 0 }
        buffer={ this.props.progress_bar.buffer > 0 ? this.props.progress_bar.buffer : 0 }
        indeterminate={ this.props.progress_bar.is_indeterminate } />
      );
  }
}

const mapStateToProps = ( state ) => {
  return {
    progress_bar: state.progressBar
  };
}

export default connect( mapStateToProps, null )( AppProgressBar );