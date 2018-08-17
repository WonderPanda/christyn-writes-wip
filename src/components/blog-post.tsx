import { graphql } from 'gatsby';
import * as React from 'react';
import Layout from './Layout';

export default ({ data }) => {
  return (
    <Layout>
      <div>This is a blog post</div>
      <p>{JSON.stringify(data)}</p>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        image
        title
        description
        category
        tags
      }
    }
  }
`;
