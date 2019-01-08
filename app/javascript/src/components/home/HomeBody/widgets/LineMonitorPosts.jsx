import React, { Component } from 'react';

// semantic-ui
import { Accordion, Feed, Icon } from 'semantic-ui-react';

// components
import TimeAgo from 'react-timeago';

class LineMonitorPosts extends Component {

  renderContent = (posts) => (
    <Feed>
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
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra>
              {post.body}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      ))}
    </Feed>
  );

  render() {
    const { posts } = this.props;
    const postsData = posts.data.reverse();

    const rootPanels = [
      {
        key: 'panel-main',
        title: 'Line Monitor Announcements',
        content: {
          key: 'content',
          content: this.renderContent(postsData),
        },
      },
    ];

    return (
      <Accordion
        fluid
        styled
        key="posts"
        defaultActiveIndex={0}
        panels={rootPanels}
      />
    );
  }

}

export default LineMonitorPosts;
