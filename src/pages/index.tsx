import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import 'typeface-karla';
import 'typeface-open-sans';
import Layout from '../components/Layout';
import VerticalBlogCard from '../components/VerticalBlogCard';
import { Query } from '../graphql-types';
import '../styles/index.css';

export default () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
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
        const { edges: posts, group: tagGroups } = data.allMarkdownRemark;
        return (
          <div>
            <div className="flex justify-center mb-10 border-b border-primary-darkest pb-6">
              <div className="mt-4">
                <img src="img/logo.png" alt="" style={{ maxWidth: '240px' }} />
              </div>
            </div>
            <div className="px-4 lg:px-0 lg:flex mt-4">
              <div className="lg:w-3/5">
                {posts.map(({ node: post }) => (
                  <VerticalBlogCard key={post.id} post={post} />
                ))}
              </div>
              <div className="lg:w-2/5 px-12">
                <div className="bg-white border-t border-primary-darkest p-6 shadow rounded flex flex-col items-center">
                  <img src="img/christyn.jpg" className="w-32" alt="Christyn" />
                  <p className="mt-4">
                    I'm a writer by heart and a nerd by day. I love food, books,
                    budgeting, and cannot live without my to-do lists. I'm
                    navigating life as a creative and want to share the journey
                    with you.
                  </p>
                </div>
                <div className="bg-white border-t border-primary-darkest p-6 mt-10 shadow rounded flex flex-col">
                  <p className="text-lg text-primary-dark">Tags</p>
                  <div className="py-4">
                    {tagGroups.map(tag => (
                      <span
                        key={tag.fieldValue}
                        className="inline-block mb-2 hover:bg-primary-darkest hover:text-white font-sans text-primary-darkest bg-primary-lightest rounded-full px-3 py-1 text-xs font-semibold mr-2"
                      >
                        {tag.fieldValue}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  </Layout>
);
