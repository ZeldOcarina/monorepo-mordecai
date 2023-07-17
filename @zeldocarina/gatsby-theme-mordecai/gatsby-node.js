const path = require("path");
const slugify = require("slugify");
const { fetchGatsbyNodeDynamicConfigData, buildLink } = require("./src/helpers/nodeHelpers");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
        }
      ],
    },
    experiments: {
      topLevelAwait: true
    }
  })
}

exports.onPreInit = async ({ actions, store, reporter }) => {
  const { setPluginStatus } = actions;
  const state = store.getState();

  const gtmPlugin = state.flattenedPlugins.find(plugin => plugin.name === "gatsby-plugin-google-tagmanager");

  if (gtmPlugin) {
    const GTM_ID = await fetchGatsbyNodeDynamicConfigData({
      baseId: process.env.AIRTABLE_BASE_ID,
      fields: "Value",
      labelColumnName: "Label",
      labelValue: "Google Tag Manager ID",
      supposedStartingValue: "GTM",
      expectedValueName: "GTM ID",
      reporter
    });

    gtmPlugin.pluginOptions = { ...gtmPlugin.pluginOptions, ...{ id: GTM_ID } };
    setPluginStatus({ pluginOptions: gtmPlugin.pluginOptions }, gtmPlugin);
  }
};

exports.createPages = async function ({ actions, graphql, reporter }) {
  const { data } = await graphql(`
      query {
        dynamicPagesData: allAirtable(
          filter: {table: {eq: "Sitemap"}, data: {unmapped: {ne: true}}}
        ) {
          dynamicPagesData: nodes {
            data {
              Permalink
              Page_Title
              offerHeading
            }
          }
        }
        blogData: allAirtable(
          filter: {table: {eq: "Blog"}, data: {Publish: {eq: "Published"}}}
        ) {
          blogData: nodes {
            id
            data {
              slug
              Publish
              Categories
            }
          }
        }
      }
    `)

  const cityState = await fetchGatsbyNodeDynamicConfigData({
    baseId: process.env.AIRTABLE_BASE_ID,
    fields: "Value",
    labelColumnName: "Label",
    labelValue: "City, St",
    supposedStartingValue: "",
    expectedValueName: "City State",
    reporter
  });

  data.dynamicPagesData.dynamicPagesData.forEach(node => {
    if (!node.data.Permalink || !node.data.Page_Title) {
      reporter.warn("Page not created because Permalink or Page_Title is not available. Please check your base.");
      return;
    }
    actions.createPage({
      path: buildLink(node.data.Permalink, cityState),
      component: path.resolve(`${__dirname}/src/templates/inner-page-template.jsx`),
      context: {
        pageTitle: node.data.Page_Title,
        permalink: node.data.Permalink,
        offer: node.data.offerHeading
      },
    })
  })

  if (!data.blogData || data.blogData.length === 0) return;

  const categories = data.blogData.blogData.map(blog => blog.data.Categories)
  const uniqueCategories = [...new Set(categories.flat())].filter(category => category)

  uniqueCategories.forEach(category => {
    actions.createPage({
      path: `/dentistry-blog/category/${slugify(category, { lower: true })}`,
      component: path.resolve(`${__dirname}/src/templates/blog-category-template.jsx`),
      context: {
        category
      },
    })
  })

  data.blogData.blogData.forEach(node => {
    if (!node.data.slug) {
      reporter.warn("Blog post not created because slug is not available. Please check your base.");
      return;
    }

    actions.createPage({
      path: buildLink(`/dentistry-blog/${node.data.slug}`, cityState),
      component: path.resolve(`${__dirname}/src/templates/blog-post-template.jsx`),
      context: {
        id: node.id,
        slug: node.data.slug,
        categories: uniqueCategories
      }
    })
  })
}