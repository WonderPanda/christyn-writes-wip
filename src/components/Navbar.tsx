import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
const _ = require('lodash');

export default class Navbar extends React.Component<{}, { menuOpen: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: true
    };
  }

  // componentWillMount() {
  //   if (window.innerWidth >= 768) {
  //     this.setState({ menuOpen: true });
  //   }
  // }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
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
            <nav className="bg-primary shadow-md flex items-center justify-between flex-wrap p-4">
              <div className="flex items-center flex-no-shrink text-white mr-6">
                <Link to="/" className="no-underline text-white">
                  <span className="font-semibold font-sans text-xl tracking-tight">
                    Christyn Writes
                  </span>
                </Link>
              </div>
              <div className="block md:hidden">
                <button
                  onClick={() => {
                    this.toggleMenu();
                  }}
                  className="flex items-center px-3 py-2 border rounded text-primary-darkest border-primary-dark hover:text-white hover:border-white"
                >
                  <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>
              {this.state.menuOpen ? (
                <div className="w-full block flex-grow md:flex md:items-center md:w-auto text-sm">
                  <div className="text-sm md:flex-grow">
                    {categories.map(x => (
                      <Link
                        to={`category/${_.kebabCase(x.fieldValue)}`}
                        className="block mt-4 text-primary-darkest hover:text-white md:inline-block font-sans md:mt-0 mr-4 cursor-pointer"
                        key={x.fieldValue}
                      >
                        {x.fieldValue}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </nav>
          );
        }}
      />
    );
  }
}
