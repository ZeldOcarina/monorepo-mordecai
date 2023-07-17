# Gatsby Scripts

### Supercharge your Gatsby websites with these prebuild and deploy scripts.

How to use it:

## Install:

`npm i -D @zeldocarina/gatsby-helpers` or
`yarn add -D @zeldocarina/gatsby-helpers`

## Require

Import in the class you need from the package:
`import GatsbyPrebuilder from "@zeldocarina/gatsby-helpers/GatsbyPrebuilder`

or

`import SiteDeployer from "@zeldocarina/gatsby-helpers/SiteDeployer`

then run the script from a node file and pass in the env variable `NODE_ENV` as `development` or `production`:

```
const dotenv = require("dotenv");
const GatsbyPrebuilder = require("@zeldocarina/gatsby-helpers/GatsbyPrebuilder");

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

async function main() {
    await new GatsbyPrebuilder().prebuild();
}

main();
```

and call it with `NODE_ENV={{ENV}} node gatsby-prebuild.js`

## Suggested Use:

```
scripts {
    "build": "NODE_ENV=production node scripts/gatsby-prebuild.js && gatsb build",
    "start": "NODE_ENV=development node scripts/gatsby-prebuild.js && gatsby develop",
    "prebuild": "NODE_ENV=production node scripts/gatsby-prebuild.js",
}
```
