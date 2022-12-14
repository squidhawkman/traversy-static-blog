import React from 'react'
import path from 'path'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({frontmatter: {title, date, cover_image}, slug, content}) {
  return (
    <>
    <Link href='/'>
    <a href="/" className="btn btn-back">Go Back</a>
    </Link>
    <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <img src={cover_image} alt='' />
        {/* here's where we use marked */}
        {/* content is the actual blog post, we parse it with marked */}
        <div className="post-body">
                <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
        </div> 
    </div>
    </>
  )
}

export async function getStaticPaths() {
    const files = readdirSync(path.join('posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    //the params value is whatever you want your path to be, we want the slugs
    return {
        // paths: paths <- this is equivalent to just writing paths here
        paths,
        fallback: false
    }
}

//destructuring params and getting the slug
export async function getStaticProps({ params: { slug } }) {

const markdownWithMeta = readFileSync(path.join('posts', slug + '.md'), 'utf-8')

//this time we're getting the frontmatter and the content
const {data:frontmatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}
