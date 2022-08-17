import Container from "components/ui/Container"
import { InferGetStaticPropsType } from 'next'
import * as React from 'react'
import Post from '../components/Post'
import { IPost } from '../types'
const BASE_URL: string = 'https://jsonplaceholder.typicode.com/photos'


export default function IndexPage({  posts,}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const [postList, setPostList] = React.useState(posts)

  
  // setPostList(posts)

  if (!postList) return <h1>Loading...</h1>

  return (
    <Container title='test'>
    <main className='container'>
      <h1>My posts</h1>
      
      {postList.map((post: IPost) => (
        <Post key={post.id}   post={post} />
      ))}
    </main>    
    </Container>
  )
  
}

export async function getStaticProps() {
  const res = await fetch(BASE_URL)
  const posts: IPost[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}