import React, { Component } from 'react';
import Spinner from '../Components/spinner/Spinner';
import { connect } from 'react-redux';

class AppLevelSpinner extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <Spinner {...this.props}/>;
    }
}

function mapStateToProps(state) {
    return {
        visible: state.spinner?.isSpinnerVisible,
        text: state.spinner?.spinnerText
    };
}
export default connect(mapStateToProps)(AppLevelSpinner);