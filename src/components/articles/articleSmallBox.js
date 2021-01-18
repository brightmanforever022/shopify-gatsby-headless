import React from 'react';
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ArticleSmallBox = props => {
    const article = props.article
    
    return (
      <div className="article_sidebar-item article_sidebar-recent_posts" key={article.title}>
        <div className="article_sidebar-inner article_sidebar-recent_posts-inner">
          <div className="article_sidebar-image">
            <Link to={`/article/${article.handle}`} >
              { article.image ? 
                (<Img
                    key={article.image.id}
                    fluid={article.image.localFile.childImageSharp.fluid}
                    alt={article.title}
                />) : ""
              }
            </Link>
          </div>
          <div className="article_sidebar-text">
            <div className="article_sidebar-title">
              <Link to={`/article/${article.handle}`} >
                <h4>{article.title}</h4>
              </Link>
            </div>
            <div className="article_sidebar-description">
              <span>{article.excerpt}</span>
            </div>
            <div className="article_sidebar-button">
              <Link to={`/article/${article.handle}`}
                className="article_sidebar-btn btn--primary">
                  READ MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ArticleSmallBox;