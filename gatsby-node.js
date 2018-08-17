const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              category
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/components/${String(edge.node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      });
    });

    const tags = _(posts)
      .map(x => _.get(x, 'node.frontmatter.tags'))
      .filter(Boolean)
      .flatten()
      .uniq()
      .value();

    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/components/TagPage.tsx`),
        context: {
          tag
        }
      });
    });

    const categories = _(posts)
      .map(x => _.get(x, 'node.frontmatter.category'))
      .filter(Boolean)
      .flatten()
      .uniq()
      .value();

    categories.forEach(category => {
      const tagPath = `/category/${_.kebabCase(category)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/components/CategoryPage.tsx`),
        context: {
          category
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
