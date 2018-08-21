import { Link } from 'gatsby';
import * as React from 'react';
import { MarkdownRemark } from './../graphql-types';

export default ({ post }: { post: MarkdownRemark }) => {
  const { frontmatter } = post;
  return (
    <div className="max-w-md mb-6 mx-4 rounded overflow-hidden shadow-md">
      <img
        className="w-full"
        src={frontmatter.image}
        style={{ maxHeight: '300px' }}
      />
      <div className="px-6 py-4">
        <Link to={post.fields.slug} className="no-underline text-black">
          <p className="font-bold font-sans text-xl mb-2">
            {frontmatter.title}
          </p>
        </Link>
        <p className="text-grey-darker font-sans text-base">
          {frontmatter.description}
        </p>
      </div>
    </div>
  );
};
