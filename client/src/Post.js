import React from 'react'
import { Link} from 'react-router-dom'

/* //useParams hook is used in store id vals and show to end user

const Post = () => {
    const {id} = useParams()
  return (
   <main>
    <h1>
        Post {id}
    </h1>
   </main>
  )
}

export default Post
 */

const Post =({post}) => {
  return(
    <article className='post'>
     <Link to={`post/${post.id}`}><h2>{post.title}</h2>
      <p className='postDate'>{post.datetime}</p>
      <p className='postBody'>{
        (post.body).length <= 25 ? post.body: `${(post.body).slice(0,25)}...`
        }</p>
        </Link> 
    </article>
  )
}

export default Post