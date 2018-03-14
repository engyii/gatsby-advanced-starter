import React from "react";
import Link from "gatsby-link";
import config from "../../../data/SiteConfig";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {

      let dateFormater = { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
      };

      let date = postEdge.node.frontmatter.date;
      let dateFormated = date && Intl.DateTimeFormat('en-US', dateFormater).format(new Date(date))
      let dateModified = postEdge.node.frontmatter.dateModified;
      let dateModifiedFormated = dateModified && Intl.DateTimeFormat('en-US', dateFormater).format(new Date(dateModified))
      
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: date,
        dateFormated: dateFormated,
        dateModified: dateModified,
        dateModifiedFormated: dateModifiedFormated,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        author: postEdge.node.frontmatter.author || config.userName
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
            
            <div itemprop="author">{post.author}</div>
            <div itemprop="headline">{post.excerpt}</div>
            <time itemprop="datePublished" datetime="{post.date}">{post.dateFormated}</time>
            <time itemprop="dateModified" datetime="{post.dateModified}">{post.dateModifiedFormated}</time>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
