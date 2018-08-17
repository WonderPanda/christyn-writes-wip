import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
const _ = require('lodash');

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          categories: group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      const categories = data.allMarkdownRemark.categories;
      return (
        <nav className="bg-primary h-16 shadow-md flex items-center justify-between flex-wrap p-4">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <Link to="/" className="no-underline text-white">
              <span className="font-semibold font-sans text-xl tracking-tight">
                Christyn Writes
              </span>
            </Link>
          </div>
          <div className="block flex-grow lg:flex lg:items-center lg:w-auto text-sm">
            {categories.map(x => (
              <Link
                to={`category/${_.kebabCase(x.fieldValue)}`}
                className="block mt-4 text-primary-darkest hover:text-white lg:inline-block font-sans lg:mt-0 mr-4 cursor-pointer"
                key={x.fieldValue}
              >
                {x.fieldValue}
              </Link>
            ))}
          </div>
        </nav>
      );
    }}
  />
);
