import React from 'react'

export const Modal = ({ handleClose, show, children }) => {
    return (
        <div className={show ? "modal display-block" : "modal display-none"}>

            <section className="modal-main">
                <div className="modal_header">
                    <div className="close" onClick={handleClose}></div>
                </div>
                
                {children}
                <div className="modal_footer">
                    <button className="form-row text-center cancel" onClick={handleClose}>close</button>
                </div>
            </section>
        </div>
    );
};

export const NewfamilyMembers = (props) => {
    return (
      props.nfamilyMembers.map((val, index)=> {
        return (
            <div key={index} className="form-row">


            <div className="app-col-12">
                <div className="form-row app-col-6 form-left">
                    <label>Relationship</label>
                    <select data-id={index} name='relationship' value={props.nfamilyMembers[index].relationship} className="relationship">
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Spouse">Spouse</option>
                    </select>
                </div>
                <div className="clear"></div>
            </div>


           
            <div className="app-col-12">

                <div className="form-row app-col-6 form-left">
                    <label>FirstName</label>
                    <input data-id={index} type="text" name="firstName" value={props.nfamilyMembers[index].firstName} />
                </div>
                    
                <div className="form-row app-col-6">
                    <label>LastName</label>
                    <input data-id={index} type="text"  name="lastName" value={props.nfamilyMembers[index].lastName} />
                </div>
                <div className="clear"></div>

            </div>

            <div className="app-col-12">
                <div className="form-row app-col-6 form-left">
                    <label>Date of Birth</label>
                    <input data-id={index} type="date" name="dateOfBirth" value={props.nfamilyMembers[index].dateOfBirth} />
                </div>
                <div className="form-row app-col-6">
                    <label>Nationality</label>
                    <select data-id={index} name='nationality' value={props.nfamilyMembers[index].nationality}>
                        <option value="1">India</option>
                        <option value="2">UAE</option>
                        <option value="3">USA</option>
                    </select>
                </div>
                <div className="clear"></div>
            </div>


    
        </div>
        )
      })
    )
  }

  export const NewStudent = ({ handleClose, show, children, handlesubmit }) => {
    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">

                <div className="modal_header">
                    <div className="close" onClick={handleClose}></div>
                </div>

                {children}
                <div className="modal_footer">
                    <input type="submit" className="form-row text-center sucess" onClick={handlesubmit} value={'submit'} />
                    <button className="form-row text-center cancel" onClick={handleClose}>close</button>
                </div>
                
            </section>
        </div>
    );
};
