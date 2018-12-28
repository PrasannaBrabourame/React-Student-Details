
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../Redux/action/userAction';
import StudentDetails from './studentDetails';
import RegisterDetails from './register';

 class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { role: 1 }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        let role = Number(e.target.value)
        this.setState({role},()=>this.props.getRole(this.state.role))
        
    }
    render() {
        return (
            <div>
                <div className="header">
                    <a href="/">
                        <span>Student Details</span>
                    </a>
                    <div className="headerRight">
                        <div></div>
                        <select value={this.state.role} className="SelectBoxMenu" onChange={(e) => this.handleChange(e)}>
                            <option value="1">Admin</option>
                            <option value="2">Register</option>
                        </select>
                    </div>
                </div>
                {this.state.role === 1?<StudentDetails />:<RegisterDetails/>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role : state.role
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        getRole: (role) => dispatch(userAction.currentRole(role)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);



