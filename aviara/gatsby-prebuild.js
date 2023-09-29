async function main() {
    const gatsbyPrebuilderImport = await import("@zeldocarina/gatsby-helpers/GatsbyPrebuilder.js");
    const GatsbyPrebuilder = gatsbyPrebuilderImport.default;
    await new GatsbyPrebuilder({
        project: "mordecai",
        config: "mordecai_aviara"
    }).prebuild();
}

main();
