exports.createMapping = (category) => {
    switch (category) {
        case "Config":
            return { File: `fileNode` }
        case "Blog":
            return { mainImage: `fileNode`, thumbnail: `fileNode` }
        default:
            return { Media: `fileNode` }
    }
}