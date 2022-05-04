import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav'
import Note from './Note';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate=useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes,setNotes]=useState("");
    const [noteId,setNoteId]=useState("");
    const [search,setSearch]=useState("");

    // Fetch notes
    const fetchNotes=()=>{
        const config={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('noteToken')}`
            }
        }
        axios.get('/note/',config).then(({data})=>{
            console.log(data);
            setNotes(data);
        }).catch((err)=>console.log(err));
    }

    useEffect(()=>{
        if(!localStorage.getItem('noteToken')) navigate('/login');
        else fetchNotes();
    },[navigate])

    // Create note
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title.trim() || !content.trim()) alert("Don't leave any field empty!");
            else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('noteToken')}`
                    }
                }
                if(noteId===""){
                    const {status} = await axios.post('/note/', { title, content }, config);
                    fetchNotes();
                    setTitle("");
                    setContent("");
                    if (status !== 201) alert("Something went wrong!");
                    else {
                        alert("Note created!");
                    }
                }
                else{
                    const {status} = await axios.patch(`/note/${noteId}/`, { title, content }, config);
                    fetchNotes();
                    setTitle("");
                    setContent("");
                    setNoteId("");
                    if (status !== 200) alert("Something went wrong!");
                    else {
                        alert("Note updated!");
                    }
                }
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong!");
        }
    }

    //Update note
    const updateNote=async(id)=>{
        try {
            setNoteId(id);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('noteToken')}`
                }
            }
            const {data}=await axios.get(`/note/${id}`,config);
            setTitle(data.title);
            setContent(data.content);
        } catch (error) {
            console.log(error);
        }
    }

    // Delete note
    const deleteNote=async(id)=>{
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('noteToken')}`
                }
            }
            await axios.delete(`/note/${id}`,config);
            alert('Note deleted!');
            fetchNotes();
        } catch (error) {
            console.log(error);
        }
    }

    //Search note
    const searchNote=async(e)=>{
        e.preventDefault();
        try {
            if(!search.trim()){
                alert("Please enter something to search!");
            }
            else{
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('noteToken')}`
                    }
                }
                const {data,status}=await axios.get(`/note/search/?search=${search}`,config);
                if(status===200) setNotes(data);
            }
            setSearch("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            <div className='container bg-dark col-lg-4 col-md-6 col-sm-12 col-12 pt-2 mt-5'>
                <h1 className='display-5 text-center text-info'>Create note</h1>
                <form className="row col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5" onSubmit={handleSubmit}>
                    <input className="form-control my-2" type="text" placeholder="Title" aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete={false} />
                    <textarea className="form-control my-2" type="text" placeholder="Content" aria-label="Content" value={content} onChange={(e) => setContent(e.target.value)} autoComplete={false} rows={5} />
                    <button type="submit" className='btn btn-info  col-6 mx-auto my-4'>Create</button>
                </form>
            </div>
            <div className='container col-lg-6 col-md-6 col-sm-12 col-12 pt-2 mt-5'>
                <h1 className='display-5 text-center text-info'>Search note</h1>
                <form className="row col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5" onSubmit={searchNote}>
                    <input className="form-control w-75" type="text" placeholder="Search note(s)" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} autoComplete={false} />
                    <button type="submit" className='btn btn-info w-25 my-4'>Search</button>
                </form>
            </div>
            <div className='container-fluid pt-2 mt-5 mb-3'>
                <h1 className='display-5 text-center text-info mb-4 bg-dark p-3 w-25 mx-auto border border-info rounded'>Notes</h1>
                <div className="row d-flex align-items-center justify-content-around">
                    {
                        notes.length>0
                        ?
                        notes.map((e)=><Note key={e.id} title={e.title} id={e.id} content={e.content} deleteNoteFunc={deleteNote} updateNoteFunc={updateNote} />)
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}

export default Home