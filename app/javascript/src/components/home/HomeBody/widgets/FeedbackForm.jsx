import React from 'react';

// semantic-ui
import { Accordion, Button, Icon } from 'semantic-ui-react';

const suggestionURL = "https://docs.google.com/forms/d/e/1FAIpQLScPghAkeRi-Ey0JhWRc2xmuG5fn6TofbIf147gsgIjhsRnuCQ/viewform?embedded=true";

const questionURL = "https://docs.google.com/forms/d/e/1FAIpQLSdbyw2o6IqQekPAC8rfa66GDe_3heodU9pgy5unkj44l4g7bA/viewform?embedded=true";

const level1Panels = [
  {
    key: 'panel-suggestion',
    title: 'Suggestions',
    content: {
      content: <iframe
        src={suggestionURL} width="500" height="300" frameborder="0" marginheight="0" marginwidth="0" align='middle'>Loading...</iframe>,
    },
  }, {
    key: 'panel-question',
    title: 'Questions',
    content: {
      content: <iframe src={questionURL} width="500" height="300" frameborder="0" marginheight="0" marginwidth="0" align='middle'>Loading...</iframe>,
    },
  },
];

//Incorporates an Accordian within the larger Accordian description or content
const level1Content = (
  <div>
    Disclaimer: This section is for feedback on and questions about the tenting application
    <strong> NOT </strong> on the Tenting Process itself. Please direct those questions to <a
      href="mailto:headlinemonitor@gmail.com">
      headlinemonitor@gmail.com
    </a>. Otherwise, please fill out your suggestions or questions on our form by clicking the buttons below:

    {/* <Accordion.Accordion key="level1Content" panels={level1Panels} /> */}

    <br />
    <br />
    <Button.Group>
      <Button
        icon
        color="google plus"
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
        color="google plus"
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
    title: 'Tenting Application Question and Feedback Form',
    content: {
      content: level1Content,
    },
  },
];

const GTHCApplicationFeedbackForm = () => (
  <Accordion
    fluid
    styled
    key="feedback"
    defaultActiveIndex={0}
    panels={rootPanels}
  />
);

export default GTHCApplicationFeedbackForm;
