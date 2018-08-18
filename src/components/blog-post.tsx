import { graphql } from 'gatsby';
import * as React from 'react';
import 'typeface-karla';
import { MarkdownRemark } from './../graphql-types';
import * as styles from './blog-post.module.css';
import HtmlContent from './HtmlContent';
import Layout from './Layout';

export default ({ data }: { data: { markdownRemark: MarkdownRemark } }) => {
  const { markdownRemark: post } = data;
  console.log(styles);
  return (
    <Layout>
      <div className="px-4 lg:px-0 lg:flex mt-4">
        <div className="lg:w-3/5">
          <p className="text-3xl font-semibold mb-2 mt-10">
            {post.frontmatter.title}
          </p>
          <p className="inline-block font-bold font-sans text-base mb-4 bg-secondary-darkest px-3 py-2 mb-5 mt-2 text-white">
            {post.frontmatter.category}
          </p>
          <HtmlContent
            className={`${styles.post} font-sans`}
            content={post.html}
          />
        </div>
        <div className="lg:w-2/5" />
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
