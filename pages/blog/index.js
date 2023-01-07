import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../../lib/client'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'

const blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == 'blogs']`)
      .then((data) => {
        setPosts(data)
        // console.log(posts)
      })
      .catch(console.error)
  })
  return (
    <div className="container-fluid">
      <div className="container text-center py-4 border-bottom border-danger border-2">
        <span className="fs-4 text-uppercase fw-bold">Blogs by XTRACK</span>
      </div>
      {posts ? (
        posts.map((post) => (
          <Link href={`/blog/${post.Slug.current}`} className='text-decoration-none text-dark' key={post.id}>
            <div className="row py-4">
              {console.log(post)}
              <div className="col-lg-7 col-12">
                <img
                  className="blog-img"
                  src={urlFor(post.coverimage?.asset._ref)}
                />
              </div>
              <div className="col-lg-5 col-12">
                <div className="blog-content pt-2">
                  <h4 className="fw-bold">{post.title}</h4>
                  <BlockContent
                    projectId="ke3vv5hk"
                    dataset={'production'}
                    blocks={post.content}
                    className="blog-text text-secondary"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger rounded-0 mt-3 ms-2 text-uppercase"
                    style={{ width: '45%' }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="container text-center">
          <span className="text-uppercase fs-5">No posts to show!</span>
        </div>
      )}
    </div>
  )
}

export default blog
