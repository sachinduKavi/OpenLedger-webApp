import React from 'react';
import '../styles/change-password.css';
import tik from '../../src/assets/icons/check-circle.png';

const ChangePassword = () => {
    return (
        <div className='change-password-overlay'>
            <div className="password-change-card">
                <div className="description">
                    <h3>Set New Password</h3>
                    <p>your new password must be different to previous used Password</p>
                </div>

                <div className="text-field">
                    <div className="text-field1">
                        <p>New Password*</p>
                        <input type="password" placeholder='enter your password' />
                    </div>

                    <div className="text-field1">
                        <p>Confirm Password*</p>
                        <input type="password" placeholder='re-enter your password' />
                    </div>

                    <div className="text-field-rule">
                        <div className='rule1'>
                            <img src={tik} alt="" style={{ width: 12,height:12 }} /><p>Must be at least 8 character</p>

                        </div>

                        <div className='rule1'>
                            <img src={tik} alt="" style={{ width: 12,height:12 }} /> <p>Must contain one special character</p>

                        </div>
                       
                    </div>
                </div>

                <div className="password-change-card-btn">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
