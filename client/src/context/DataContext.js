import { createContext, useState, useEffect} from "react";
import { format } from "date-fns";
import {useNavigate } from "react-router-dom";
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({}) 

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([])
  const [search, setSearch]= useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data, fetchError, isLoading} = useAxiosFetch(`${REACT_APP_BACKEND_URL}/api/posts`)


  useEffect (() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filterResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filterResults.reverse())
  }, [posts, search])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title:postTitle, datetime,body: postBody};
    try{
    const response = await api.post('api/posts', newPost)
    const allPosts = [...posts,response.data]
    setPosts(allPosts);
    setPostTitle('')
    setPostBody('')
    navigate('/')
    } catch (err){
      if(err.response) {
         // Not in the 200 response range
         console.log(err.response.data)
         console.log(err.response.status)
         console.log(err.response.headers)
       } else {
         console.log(`Error: ${err.message}`);
       }
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime,body:editBody}
    try{
      const response = await api.put(`api/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data}: post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }catch (err){
      console.log(`Error: ${err.message}`);
    }
  }
  const handleDelete = async(id) => {
    try{
      await api.delete(`api/posts/${id}`)
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/')
  } catch (err){
    console.log(`Error: ${err.message}`)
  }
  }
    return (                         //Common values are efficient in useContext but single or rarely using values can use in thier usable components not in this hook //
        <DataContext.Provider value ={{ 
            width, search, setSearch,searchResults,fetchError, isLoading,handleSubmit, postTitle, setPostTitle, postBody,setPostBody,posts, handleEdit, editBody, setEditBody,editTitle, setEditTitle, handleDelete

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext
