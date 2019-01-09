import React from 'react';

// semantic-ui
import { Accordion, Button, Header, Icon } from 'semantic-ui-react';

const suggestionURL = "https://docs.google.com/forms/d/e/1FAIpQLScPghAkeRi-Ey0JhWRc2xmuG5fn6TofbIf147gsgIjhsRnuCQ/viewform?embedded=true";

const questionURL = "https://docs.google.com/forms/d/e/1FAIpQLSdbyw2o6IqQekPAC8rfa66GDe_3heodU9pgy5unkj44l4g7bA/viewform?embedded=true";

//Incorporates an Accordian within the larger Accordian description or content
const level1Content = (
  <div>
    <Header>Have any suggestions or questions about GTHC?</Header>
    <Header as="h5">GTHC is an app built for Duke students by Duke students, and we are always looking to improve. We can only do that by listening to you all. Fill out either one of the Google forms for any suggestions or questions that you may have!</Header>
    Disclaimer: This section is <strong> NOT </strong> on the Tenting Process itself. Please direct those questions to <a
      href="mailto:headlinemonitor@gmail.com">
      headlinemonitor@gmail.com
    </a>.


    <br />
    <br />
    <Button.Group>
      <Button
        icon
        primary
        labelPosition="left"
        as="a"
        target="_blank"
        href={suggestionURL}
      >
        <Icon name="google" />
        Suggestions
      </Button>
      <Button.Or />
      <Button
        icon
        primary
        labelPosition="right"
        as="a"
        target="_blank"
        href={questionURL}
      >
        <Icon name="google" />
        Questions
      </Button>
    </Button.Group>
  </div>
);

const rootPanels = [
  {
    key: 'panel-main',
    title: 'GTHC Question and Feedback Forms',
    content: {
      key: 'content',
      content: level1Content,
    },
  },
];

const GTHCApplicationFeedbackForm = () => (
  <Accordion
    fluid
    styled
    key="feedback"
    panels={rootPanels}
  />
);

export default GTHCApplicationFeedbackForm;
