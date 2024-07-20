import React from 'react';
import '../styles/ComplaintList.css';



export default function ComplaintList() {

  const complaints = [
    {
      id: 1,
      text: "AIESEC is an international 'youth-run' and led, non-governmental and not-for-profit organization that provides young people with business development internships. The organization focuses on empowering young people to make a progressive social impact.",
      likes: 6,
      comments: 18,
      time: '30 MIN AGO',
      date: '11.45 A.M',
    },
  ];
  
  return (
    
    <div>
       <div className="complaint-list">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="complaint">
          <div className="complaint-header">
            <span>Anonymous</span>
            <span>{complaint.time}</span>
            <span>{complaint.date}</span>
          </div>
          <p>{complaint.text}</p>
          <div className="complaint-footer">
            <span>{complaint.likes} likes</span>
            <span>{complaint.comments} comments</span>
          </div>
        </div>
      ))}
    </div>

    </div>
  )
}



