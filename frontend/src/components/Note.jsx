import React from 'react'

const Note = ({id,title,content,deleteNoteFunc,updateNoteFunc}) => {
  return (
    <>
    <div className="card col-lg-4 col-md-6 col-sm-12 col-12 bg-dark text-white m-2">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <div className="d-flex flext-row justify-content-between">
          <button className="btn btn-info" onClick={()=>{
              updateNoteFunc(id);
          }}>Update</button>
          <button className="btn btn-danger" onClick={()=>{
              deleteNoteFunc(id);
          }}>Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Note