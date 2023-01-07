import React from 'react'
import { client, urlFor } from '../../lib/client'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'

const Posts = ({ post }) => {
  console.log(post)
  return (
    <>
      <div className="container-fluid py-4 post-box">
        <div className="post-img-box">
          <img className="post-img" src={urlFor(post.coverimage?.asset._ref)} alt={post.title} />
        </div>
        <div className="container text-center pt-5">
          <h3 className="text-uppercase fw-bold">{post.title}</h3>
        </div>
      </div>
      <div className="container content py-3">
        <BlockContent
          projectId="ke3vv5hk"
          dataset={'production'}
          blocks={post.content}
          className='text-secondary'
        />
      </div>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  const query = `*[_type == 'blogs' && Slug.current == '${slug}'][0]`
  const post = await client.fetch(query)

  return {
    props: {
      post,
    },
  }
}

export default Posts
