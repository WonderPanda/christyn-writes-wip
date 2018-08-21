import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import { MarkdownRemark } from './../graphql-types';

export default ({ post }: { post: MarkdownRemark }) => {
  const { frontmatter } = post;
  return (
    <div className="max-w-md mb-6 rounded overflow-hidden shadow-md">
      <img
        className="w-full"
        src={frontmatter.image}
        alt="Sunset in the mountains"
        style={{ maxHeight: '360px' }}
      />
      <div className="px-6 py-4">
        <p className="inline-block font-bold font-sans text-base mb-2 bg-secondary-darkest px-3 py-2 mb-5 mt-2 text-white">
          {frontmatter.category}
        </p>
        <Link to={post.fields.slug} className="no-underline text-black">
          <p className="font-bold font-sans text-xl mb-2">
            {frontmatter.title}
          </p>
        </Link>
        <p className="text-grey-darker font-sans text-base">
          {frontmatter.description}
        </p>
      </div>
      <div className="px-6 py-4">
        {frontmatter.tags.map(tag => (
          <Link
            to={`/tags/${_.kebabCase(tag)}`}
            className="no-underline text-black"
            key={tag}
          >
            <span
              key={tag}
              className="inline-block font-sans hover:bg-primary-darkest hover:text-white text-primary-darkest bg-primary-lightest rounded-full px-3 py-1 text-xs font-semibold mr-2"
            >
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
