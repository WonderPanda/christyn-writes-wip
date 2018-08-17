import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import 'typeface-open-sans';
import Layout from '../components/Layout';
import VerticalBlogCard from '../components/VerticalBlogCard';
import { Query } from '../graphql-types';
import '../styles/index.css';

export default () => (
  <Layout>
    <div className="flex justify-center mb-10 border-b pb-6">
      <div className="mt-4">
        <img src="img/logo.png" alt="" style={{ maxWidth: '240px' }} />
      </div>
    </div>
    <div className="flex mt-4">
      <div className="w-3/5">
        <StaticQuery
          query={graphql`
            query {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 400)
                    id
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      templateKey
                      image
                      category
                      description
                      date(formatString: "MMMM DD, YYYY")
                      tags
                    }
                  }
                }
              }
            }
          `}
          render={(data: Query) => {
            const { edges: posts } = data.allMarkdownRemark;
            return (
              <div>
                {posts.map(({ node: post }) => (
                  <VerticalBlogCard key={post.id} post={post} />
                ))}
              </div>

              // <Container>
              //   {/* <HeroLogo src={"img/full-logo.png"} /> */}
              //   <Content>

              //   </Content>
              //   <SideBar />
              // </Container>
            );
          }}
        />
      </div>
      <div className="w-2/5">Sidebar content</div>
    </div>
  </Layout>
);
