import * as actionTypes from '../action/actionType';

export default (state = [], action) => {
  switch (action.type){
    // case actionTypes.CREATE_NEW_STUDENT:
    // return [
    //   ...state,
    //   Object.assign({}, action.studentDetails)
    // ];
    case actionTypes.DELETE_STUDENT:
    return state.filter((data, i) => i !== action.id);
    case actionTypes.UPDATE_STUDENT_DETAILS:
    state[action.id] = action.studentDetails
        return state;
    case actionTypes.GET_ALL_SUBMITTEDSTUDENT:
      action.submittedStudent.familyMembers = action.familyMembers;
      return [
        ...state,
        Object.assign(action.submittedStudent, action.submittedStudent)
      ]
    case actionTypes.CURRENT_ROLE:
      state['role'] = action.role
      return [...state]
    default:
          return state;
  }
  };