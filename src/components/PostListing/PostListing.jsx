import React from "react";
import Link from "gatsby-link";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        dateModified: postEdge.node.frontmatter.dateModified,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div itemscope itemtype="http://schema.org/CreativeWork">
            <Link to={post.path} key={post.title}>
              <h1 itemprop="name">{post.title}</h1>
            </Link>
            <div itemprop="headline">{post.excerpt}</div>
            <time itemprop="datePublished" datetime="{post.date}">{Intl.DateTimeFormat('en-US', {})}</time>
            <time itemprop="dateModified" datetime="{post.dateModified}"></time>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
