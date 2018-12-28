import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as userAction from '../Redux/action/userAction';
import { NewStudent, Modal, NewfamilyMembers } from './commanComponent'

class RegisterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showfamilyMember: false,
            nfamilyMembers: [],
            studentdetails: [],
            role: 2,
            nationality: [],
            show: false,
            newStudentshow: false,
            field: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1
            }, newStudent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1,
            }, familyMembers: [],
            isSubmitted: false
        };
        this.showDetails = this.showDetails.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.approveSumbit = this.approveSumbit.bind(this);
    }


    handleChanges = event => {
        if (event.target.dataset.id !== undefined) {
            let nfamilyMembers = [...this.state.nfamilyMembers]
            nfamilyMembers[event.target.dataset.id][event.target.name] = event.target.value
            this.setState({ nfamilyMembers })
        } else {
            let newStudent = { ...this.state.newStudent }
            newStudent[event.target.name] = event.target.value
            this.setState({ newStudent })
        }
    }

    approveSumbit = (event, index) => {
        var currentSubmittedStudent = this.props.studentdetails[index - 1];
        this.setState({
            field: {
                firstName: currentSubmittedStudent.firstName,
                lastName: currentSubmittedStudent.lastName,
                dateOfBirth: currentSubmittedStudent.dateOfBirth,
                nationality: currentSubmittedStudent.nationality,
            }, familyMembers: currentSubmittedStudent.familyMembers
        }, () => {
            this.props.registerStudentSumbit(this.state.field, this.state.familyMembers);
            this.props.studentdetails.splice(index - 1,1)
            this.setState({
                nfamilyMembers: [],
                newStudentshow: false, newStudent: {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    nationality: 1,
                    familyMembers: []
                }, field: {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    nationality: ''
                }, familyMembers: []
            });
            var studentFetch = this.props.getAllStudent();
            var nationalityFetch = this.props.getAllNationality();
            studentFetch.then(response => {
                this.setState({ studentdetails: response.studentdetails })
                nationalityFetch.then(response => {
                    this.setState({ nationality: response.nationality })
                })
            })
        })

    }

    addNewStudentModel = (e) => {
        this.setState({
            newStudentshow: true, newStudent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1,
                familyMembers: []
            }
        });
    }

    newStudentHideModal = (e) => {
        this.setState({
            newStudentshow: false, newStudent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1,
                familyMembers: []
            }
        });
    }

    handlesubmit = (e) => {
        this.props.registerStudentSumbit(this.state.newStudent, this.state.nfamilyMembers);
        this.setState({
            isSubmitted: true,
            nfamilyMembers: [],
            newStudentshow: false, newStudent: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1,
                familyMembers: []
            }
        });
        var studentFetch = this.props.getAllStudent();
        var nationalityFetch = this.props.getAllNationality();
        studentFetch.then(response => {
            this.setState({ studentdetails: response.studentdetails })
            nationalityFetch.then(response => {
                this.setState({ nationality: response.nationality })
            })
        })
    }

    showModal = () => {
        this.setState({
            show: true, field: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: 1,
            }, familyMembers: []
        });
    };

    hideModal = () => {
        this.setState({
            show: false, field: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: ''
            }, familyMembers: []
        });
    };

    componentDidMount() {
        var studentFetch = this.props.getAllStudent();
        var nationalityFetch = this.props.getAllNationality();
        studentFetch.then(response => {
            this.setState({ studentdetails: response.studentdetails })
            nationalityFetch.then(response => {
                this.setState({ nationality: response.nationality })
            })
        })
    }

    showDetails(event, dataidx, index, type) {
        if (type === 'studentList') {
            let currentStudent = this.props.getCurrentStudent(dataidx);
            let getfamilymembers = this.props.getfamilymembers(dataidx);
            let getCurrentStudentNationality = this.props.getCurrentStudentNationality(dataidx)
            currentStudent.then(response => {
                var cDate = new Date(response.currentStudentdetails.dateOfBirth)
                this.setState({
                    show: true, field: {
                        firstName: response.currentStudentdetails.firstName,
                        lastName: response.currentStudentdetails.lastName,
                        dateOfBirth: `${cDate.getDate()}-${cDate.getMonth() + 1}-${cDate.getFullYear()}`,
                        nationality: response.currentStudentdetails.firstName
                    }
                })
                getfamilymembers.then(response => {
                    this.setState({ familyMembers: response.FamilyMembers })
                }).catch(() => {
                    this.setState({ familyMembers: [] })
                })
                getCurrentStudentNationality.then(response => {
                    this.setState({
                        field: {
                            nationality: response.userNationality.nationality.Title
                        }
                    })
                }).catch(() => {
                    this.setState({
                        field: {
                            nationality: 'NA'
                        }
                    })
                })

            }).catch(() => {
                this.setState({
                    show: false
                })
            })
        } else {
            var currentSubmittedStudent = this.props.studentdetails[index - 1];
            this.setState({
                show: true, field: {
                    firstName: currentSubmittedStudent.firstName,
                    lastName: currentSubmittedStudent.lastName,
                    dateOfBirth: currentSubmittedStudent.dateOfBirth,
                    nationality: currentSubmittedStudent.nationality,
                }, familyMembers: currentSubmittedStudent.familyMembers
            })
        }
    }

    familymembersview(data, index, type) {
        var cDate = new Date(data.dateOfBirth)
        return (
            <div key={index} className="form-row">
                <div className="app-col-6 form-left">
                    <label>Relationship</label>
                    <input type="text" disabled={type} name="relationship" value={data.relationship} />
                    <label>FirstName</label>
                    <input type="text" disabled={type} name="firstName" value={data.firstName} />
                    <label>Date of Birth</label>
                    <input type="text" disabled={type} name="dateOfBirth" value={`${cDate.getDate()}-${cDate.getMonth() + 1}-${cDate.getFullYear()}`} />
                </div>
                <div className="app-col-6">
                    <label className="hidden">Dummy</label>
                    <input className="hidden" type="text" />
                    <label>LastName</label>
                    <input type="text" disabled={type} name="lastName" value={data.lastName} />
                    {
                        data.nationality !== undefined ? <div><label>Nationality</label>
                        <select disabled={type} name='nationality' value={data.nationality.ID}>
                                        <option value="1">India</option>
                                        <option value="2">UAE</option>
                                        <option value="3">USA</option>
                                </select>
                            </div> : null
                    }
                </div>
            </div>
        )
    }

    listView(data, index, type) {
        var cDate = new Date(data.dateOfBirth)

        return (
            type === 'approvalList' ?
                <tr key={index}>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{`${cDate.getDate()}-${cDate.getMonth() + 1}-${cDate.getFullYear()}`}</td>
                    <td><button onClick={(event) => this.showDetails(event, data.ID, index, type)}>Edit</button></td>
                    <td><button onClick={(event) => this.approveSumbit(event, index)}>Approval</button></td>
                </tr> : <tr key={index} onClick={(event) => this.showDetails(event, data.ID, index, type)}>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{`${cDate.getDate()}-${cDate.getMonth() + 1}-${cDate.getFullYear()}`}</td>
                </tr>
        )
    }

    generateNationality(data, index) {
        return (
            <option key={index} value={data.ID}>{data.Title}</option>
        )
    }

    familyMembers = (e) => {
        this.setState((prevState) => ({
            showfamilyMember: true,
            nfamilyMembers: [...prevState.nfamilyMembers, { relationship: 1 }],
        }));
    }

    render() {
        let { nfamilyMembers } = this.state
        return (
            <div className="main-section">
                <div>
                    {this.props.studentdetails.length > 0 ? <div><div className="text-center">Pending Student Details for Register Approval</div>
                        <br></br>
                        <table className="zui-table form-caption template">
                            <thead>
                                <tr>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Date of Birth</th>
                                    <th>Edit / View</th>
                                    <th>Approve</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.studentdetails.map((data, i) => this.listView(data, i + 1, 'approvalList'))}
                            </tbody>
                        </table></div> : null}
                    <div className="form-row text-center">
                        <button onClick={this.addNewStudentModel} className="submit-btn" >
                            Add New Student
                    </button>
                    </div>
                </div>
                <div>
                    <div className="text-center">Submitted Student Details</div>
                    <br></br>
                    <table className="zui-table form-caption template">
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.studentdetails.map((data, i) => this.listView(data, i + 1, 'studentList'))}
                        </tbody>
                    </table>
                </div>
                {this.state.show ? <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className="form-left app-col-12 form_operation" >
                        <div className="form-row">
                            <label className="form_title">Basic Information</label>
                            <div className="app-col-6 form-left">
                                <label>FirstName</label>
                                <input type="text" disabled={true} name="firstName" value={this.state.field.firstName} />
                                <label>Date of Birth</label>
                                <input type="text" disabled={true} name="dateOfBirth" value={this.state.field.dateOfBirth} />
                            </div>
                            <div className="app-col-6">
                                <label>LastName</label>
                                <input type="text" disabled={true} name="lastName" value={this.state.field.lastName} />
                                <label>Nationality</label>
                                <select disabled={true} name='nationality' value={this.state.field.nationality}>
                                        <option value="1">India</option>
                                        <option value="2">UAE</option>
                                        <option value="3">USA</option>
                                </select>
                               
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    {this.state.familyMembers.length > 0 ? <div className="form-left app-col-12 form_operation" >
                        <label className="form_title">Family Information</label>
                        {this.state.familyMembers.map((data, i) => this.familymembersview(data, i + 1, true))}
                        <br></br>
                        <div className="clear"></div>
                    </div> : null}
                </Modal> : null}
                {this.state.newStudentshow ? <NewStudent show={this.state.newStudentshow} handleClose={this.newStudentHideModal} handlesubmit={(e) => this.handlesubmit(e)}>
                    <form onChange={(e) => this.handleChanges(e)}>
                        <div className="form-left app-col-12 form_operation" >
                            <div className="form-row">
                                <label className="form_title">Basic Information</label>
                                <div className="app-col-6 form-left">
                                    <label>FirstName</label>
                                    <input className="firstName" placeholder="firstName" type="text" name="firstName" value={this.state.newStudent.firstName} />
                                    <label>Date of Birth</label>
                                    <input className="dateOfBirth" type="date" name="dateOfBirth" value={this.state.newStudent.dateOfBirth} />
                                </div>
                                <div className="app-col-6">
                                    <label>LastName</label>
                                    <input className="lastName" placeholder="lastName" type="text" name="lastName" value={this.state.newStudent.lastName} />
                                    <label>Nationality</label>
                                    <select className="nationality" name='nationality' value={this.state.newStudent.nationality}>
                                        {this.state.nationality.map((data, i) => this.generateNationality(data, i + 1))}
                                    </select>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="form-left app-col-12 form_operation" >
                        </div>
                        <div className="extra_form">
                            {this.state.showfamilyMember ? <div><label className="form_title">Family Information</label><NewfamilyMembers nfamilyMembers={nfamilyMembers} /></div> : null}
                        </div>
                        <div className="form-row footer_action">
                            <input type="button" onClick={this.familyMembers} value={'Add New Member'} />
                        </div>
                    </form>
                </NewStudent> : null}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        studentdetails: state.studentdetails,
        role: state.role
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        getAllStudent: (studentdetails) => dispatch(userAction.fetchAllStudent(studentdetails)),
        getAllNationality: (nationality) => dispatch(userAction.fetchAllNationality(nationality)),
        createNewStudent: studentdetails => dispatch(userAction.createNewStudent(studentdetails)),
        getCurrentStudent: (id) => dispatch(userAction.fetchCurrentStudent(id)),
        getfamilymembers: (id) => dispatch(userAction.fetchFamilyMembers(id)),
        deleteStudent: index => dispatch(userAction.deleteStudent(index)),
        getAllSubmittedStudent: (submittedStudentDetails, familyMembers) => dispatch(userAction.submittedStudentDetails(submittedStudentDetails, familyMembers)),
        updateStudent: (studentdetails, index) => dispatch(userAction.updateStudent(studentdetails, index)),
        getCurrentStudentNationality: id => dispatch(userAction.getCurrentStudentNationality(id)),
        registerStudentSumbit: (newStudent, nfamilyMembers) => dispatch(userAction.registerStudentSumbit(newStudent, nfamilyMembers))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterDetails);