import { graphql } from 'gatsby';
import * as React from 'react';
import { MarkdownRemark } from './../graphql-types';
import HtmlContent from './HtmlContent';
import Layout from './Layout';

export default ({ data }: { data: { markdownRemark: MarkdownRemark } }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <div className="flex mt-4">
        <div className="w-3/5">
          <HtmlContent className="font-sans" content={post.html} />
        </div>
        <div className="w-2/5" />
      </div>
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
