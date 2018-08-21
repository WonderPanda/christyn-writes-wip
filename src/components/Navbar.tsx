import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
const _ = require('lodash');

export default class Navbar extends React.Component<{}, { menuOpen: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

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
                  <svg
                    className="fill-current mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.473 7.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-1.946 11.333v7.534h-16v-12h8.013l2.058-2h-12.071v16h20v-11.473l-2 1.939z" />
                  </svg>
                </Link>
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
              <div className="w-full block flex-grow md:flex md:items-center md:w-auto text-sm">
                <div className="hidden md:block">
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
                <div className="md:hidden">
                  {this.state.menuOpen ? (
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
                  ) : null}
                </div>
              </div>
            </nav>
          );
        }}
      />
    );
  }
}
