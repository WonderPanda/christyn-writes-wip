import * as React from 'react';
import { frontmatter_2 } from './../graphql-types';

export default ({ post }: { post: frontmatter_2 }) => {
  return (
    <div className="max-w-md w-full lg:flex my-6 ml-8 shadow">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="border-r border-black border-b border-l border-grey lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="text-black font-sans font-bold text-lg mb-2">
          {post.title}
        </div>
        <div className="text-black font-sans text-sm">{post.description}</div>
        <div className="px-6 py-4">
          {post.tags.map(tag => (
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-xs font-semibold text-grey-darker mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
