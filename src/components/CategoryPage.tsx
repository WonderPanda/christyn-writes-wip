import { graphql } from 'gatsby';
import * as React from 'react';
import { Query } from '../graphql-types';
import Layout from './Layout';
import SmallCard from './SmallCard';

export default ({
  pageContext,
  data
}: {
  pageContext: { category: string };
  data: Query;
}) => {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <h1 className="text-3xl text-primary-darkest mt-10 mb-6 ml-4">
        Category > {pageContext.category}
      </h1>

      <div className="flex flex-wrap mt-4">
        {posts.map(({ node: post }) => (
          <div className="sm:w-1/2 lg:w-1/3" key={post.id}>
            <SmallCard post={post} />
          </div>
        ))}
      </div>
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
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image
          }
        }
      }
    }
  }
`;
