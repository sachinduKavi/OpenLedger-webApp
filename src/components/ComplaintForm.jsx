import React from 'react';
import '../styles/ComplaintForm.css';



export default function ComplaintForm() {

  return (

    <div className='cmp-row'>
      <div className="cmp-complaint-form">
      <h3>Add Your Complaint</h3>
      <form>
        <label>
          Name:
          <input type="text" placeholder="eg:- 'Aiesec group'" />
        </label>
        <label>
          Subject:
          <input type="text" />
        </label>
        <label>
          Description:
          <textarea />
        </label>
        <label>
          Upload Evidence:
          <input type="file" />
        </label>
        <label className="identity">
          Identity:
          <input type="checkbox" />
          <span>Anonymous</span>
        </label>
        <div className='btn'>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  

    </div>
  )
}

