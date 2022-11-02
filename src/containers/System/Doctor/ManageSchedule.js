import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Manage Schedule</div>
            </React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
