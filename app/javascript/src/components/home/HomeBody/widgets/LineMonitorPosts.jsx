import React, { Component } from 'react';

// semantic-ui
import { Accordion, Checkbox, Feed, Icon, Segment } from 'semantic-ui-react';

// components
import TimeAgo from 'react-timeago';

class LineMonitorPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recent: true,
    };
  }

  renderContent = (posts) => {
    const { recent } = this.state;
    return (
      <div>
        <Checkbox
          toggle
          label={recent ? 'Recent' : 'All'}
          checked={recent}
          onChange={() => {
            this.setState({ recent: !recent });
          }}
        />
        <Feed style={{overflow: 'auto', maxHeight: 200 }}>
          {posts.map(post => (
            <Feed.Event key={post.id}>
              <Feed.Label>
                <Icon name="announcement" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  {post.title}
                  <Feed.Date>
                    posted <TimeAgo date={post.created_at} />
                    {
                      post.updated &&
                      <span>
                        , (updated <TimeAgo date={post.updated_at} />)
                      </span>
                    }
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Extra>
                  {post.body}
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>
      </div>
    );
  };

  /**
   * sortPostData - sort post data by updated at or created at dates
   * @param  {[Array]} posts [array of posts]
   * @return {[Array]}       [array of sorted posts]
   */
  sortPostData = posts => (
    posts.data.sort((a, b) => {
      let aDate = a.created_at;
      let bDate = b.created_at;
      if (a.created_at != a.updated_at) {
        a.updated = true;
        aDate = a.updated_at;
      } else {
        a.updated = false;
      }

      if (b.created_at != b.updated_at) {
        b.updated = true;
        bDate = b.updated_at;
      } else {
        b.updated = false;
      }

      return (new Date(bDate)) - (new Date(aDate));
    })
  );

  render() {
    const { recent } = this.state;
    let { posts } = this.props;

    // sort post data by updated at or created at dates
    const postsData = this.sortPostData(posts);

    // if recent only get the top 5 posts
    const renderedPosts = recent ? postsData.slice(0, 5) : postsData;

    const rootPanels = [
      {
        key: 'panel-main',
        title: 'LTESTING 123',
        content: {
          key: 'content',
          content: this.renderContent(renderedPosts),
        },
      },
    ];

    return (
      <Accordion
        fluid
        styled
        key="posts"
        panels={rootPanels}
        defaultActiveIndex={0}
      />
    );
  }

}

export default LineMonitorPosts;
