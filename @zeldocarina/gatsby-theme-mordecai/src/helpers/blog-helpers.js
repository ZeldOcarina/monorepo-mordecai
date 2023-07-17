export function createCategoriesArray(blogData) {
    // Create a new array and fill it with only the categories of the blogData array
    const categories = blogData.map(blog => {
        return blog.data.Categories
    })
    return [...new Set(categories.flat())].filter(category => category)
}