import { graphql } from 'gatsby';
import * as React from 'react';
import Layout from './Layout';

export default ({ data }) => {
  return (
    <Layout>
      <div>Category Page</div>
      <p>{JSON.stringify(data)}</p>
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
