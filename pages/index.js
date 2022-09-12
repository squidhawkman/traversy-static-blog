import Head from 'next/head'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

{/* why do we use () here and not {}?  */}
{/* Thank you Travis. It's because we're returning an object. Or at least that's one case. Here we're returning a component so I guess that needs () too. */}
<div className='posts'>
    {posts.map((post, index) => (
      <Post key={index} post={post} />
    ))}
</div>
    </div>
  )
}

export async function getStaticProps() {
  //Get files from the posts directory
const files = readdirSync(path.join('posts'))

//Get slug and front matter from posts
const posts = files.map(filename => {
  //Create slug
  const slug = filename.replace('.md', '')

  //Get frontmatter
  const markdownWithMeta = readFileSync(path.join('posts', filename), 'utf-8')

  //extracting the data and renaming it to frontmatter
const {data:frontmatter} = matter(markdownWithMeta)


//this is what we're displaying on the home page
  return {
    slug,
    frontmatter
  }

})

console.log(posts)

console.log(files);
  return {
    props: {
      // "instead of putting the function here we'll use a utility and bring it in, basically we're writing the function and having it somewhere else"
      posts: posts.sort(sortByDate)
    }
  }
} 