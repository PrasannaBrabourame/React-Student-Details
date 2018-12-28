import * as actionTypes from './actionType';
import axios from 'axios';
import env from '../../Services/env'


export const fetchAllStudent = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(env.URL + "/api/Students")
                .then(response => {
                    resolve(dispatch(getAllStudent(response.data)))
                })
                .catch(error => {
                    reject(error);
                });
        })
    };
};

export const fetchAllNationality = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(env.URL + "/api/Nationalities")
                .then(response => {
                    resolve(dispatch(getAllNationality(response.data)))
                })
                .catch(error => {
                    reject(error);
                });
        })
    };
};

export const fetchCurrentStudent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(env.URL + `/api/Students/${id}`)
                .then(response => {
                    resolve(dispatch(getCurrentStudent(response.data)))
                })
                .catch(error => {
                    reject(error);
                });
        })
    };
};

export const fetchFamilyMembers = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(env.URL + `/api/Students/${id}/FamilyMembers`)
                .then(response => {
                    resolve(dispatch(getFamilyMembers(response.data)))
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export const submittedStudentDetails = (submittedStudent, familyMembers) => {
    return {
        type: actionTypes.GET_ALL_SUBMITTEDSTUDENT,
        submittedStudent: submittedStudent,
        familyMembers: familyMembers
    }
}


export const currentRole = (role) => {
    return {
        type: actionTypes.CURRENT_ROLE,
        role: role
    }
}

export const registerStudentSumbit = (submittedStudent, familyMembers) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(env.URL + `/api/Students/`, submittedStudent)
                .then(response => {
                    console.log(response);
                    //resolve(dispatch(createNewStudent(submittedStudent)))
                    if (familyMembers.length > 0) {
                        for (let i = 0; i < familyMembers.length; i++) {
                            axios.post(env.URL + `/api/Students/${response.data.ID}/FamilyMembers/`, familyMembers[i])
                                .then(responseout => {
                                    console.log(responseout);
                                    //let result = { familyMemberID: responseout.data.ID, nationalityID: Number(familyMembers[i].nationality) }
                                    axios.put(env.URL + `/api/FamilyMembers/${responseout.data.ID}/Nationality/${Number(familyMembers[i].nationality)}`)
                                        .then(responseNationality => {
                                            dispatch(createNewStudent(responseNationality))
                                        }).catch(error => {
                                            reject(error);
                                        })
                                })
                                .catch(error => {
                                    reject(error);
                                });
                        }
                        resolve('Success')
                    }else{
                        resolve(dispatch(createNewStudent(submittedStudent)))
                    }
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export const getCurrentStudentNationality = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(env.URL + `/api/Students/${id}/Nationality/`)
                .then(response => {
                    resolve(dispatch(getCurrentUserNationality(response.data)))
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export const getCurrentUserNationality = (userNationality) => {
    return {
        type: actionTypes.GET_CURRENT_STUDENT_NATIONALITY,
        userNationality: userNationality
    }
}

export const getAllStudent = (studentdetails) => {
    return {
        type: actionTypes.GET_STUDENT,
        studentdetails: studentdetails
    }
}

export const createNewStudent = (studentdetails) => {
    return {
        type: actionTypes.CREATE_NEW_STUDENT,
        studentdetails: studentdetails
    }
};

export const deleteStudent = (id) => {
    return {
        type: actionTypes.DELETE_STUDENT,
        id: id
    }
};

export const updateStudent = (studentdetails, id) => {
    return {
        type: actionTypes.UPDATE_STUDENT_DETAILS,
        studentdetails: studentdetails,
        id: id
    }
};

export const getFamilyMembers = (FamilyMembers) => {
    return {
        type: actionTypes.GET_FAMILY_MEMBERS,
        FamilyMembers: FamilyMembers,
    }
};

export const updateFamilyMember = (studentdetails, id) => {
    return {
        type: actionTypes.UPDATE_FAMILT_MEMBER,
        studentdetails: studentdetails,
        id: id
    }
};

export const deleteFamilyMember = (studentdetails, id) => {
    return {
        type: actionTypes.DELETE_FAMILT_MEMBER,
        studentdetails: studentdetails,
        id: id
    }
};

export const getCurrentStudent = (currentStudentdetails) => {
    return {
        type: actionTypes.GET_STUDENT_DETAILS,
        currentStudentdetails: currentStudentdetails
    }
}

export const getFamilyMemberNationality = (studentdetails, id) => {
    return {
        type: actionTypes.GET_FAMILY_MEMBER_NATIONALITY,
        studentdetails: studentdetails,
        id: id
    }
};

export const updateFamilyMemberNationality = (studentdetails, id) => {
    return {
        type: actionTypes.UPDATE_FAMILY_MEMBER_NATIONALITY,
        studentdetails: studentdetails,
        id: id
    }
};


export const getAllNationality = (nationality) => {
    return {
        type: actionTypes.GET_ALL_NATIONALITY,
        nationality: nationality,
    }
};

export const receive_error = () => {
    return {
        type: "RECEIVE_ERROR"
    };
};