//the new is for making a new instance of a class? Right, and it's converting that date from a string to a value that we can calculate with. We have access to frontmatter here because we added the sort onto posts, which has the frontmatter.
export const sortByDate = (a,b) => {
    console.log(new Date(b.frontmatter.date))
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}