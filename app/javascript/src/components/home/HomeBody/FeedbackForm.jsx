import React from 'react';
import { Accordion} from 'semantic-ui-react';


const level1Panels = [
  { key: 'panel-1a', title: 'Suggestions', content:{content: <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScPghAkeRi-Ey0JhWRc2xmuG5fn6TofbIf147gsgIjhsRnuCQ/viewform?embedded=true" width="500" height="300" frameborder="0" marginheight="0" marginwidth="0" align='middle' >Loading...</iframe> }},
  { key: 'panel-ba', title: 'Questions', content: {content: <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdbyw2o6IqQekPAC8rfa66GDe_3heodU9pgy5unkj44l4g7bA/viewform?embedded=true" width="500" height="300" frameborder="0" marginheight="0" marginwidth="0" align='middle' >Loading...</iframe>
}} ,
]

//Incorporates an Accordian within the larger Accordian description or content
const level1Content = (
  <div>
    Disclaimer: This section is for feedback on and questions you may have about the GTHC tenting application
    <strong> NOT </strong> on the Tenting Process itself. Please direct those questions to linemonitors@gmail.com
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

  const rootPanels = [
    { key: 'panel-1', title: 'Tenting Application FAQ and Feedback', content: { content: level1Content } },
  ]

  const GTHCApplicationFeedbackForm = () => (
    <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    );


export default GTHCApplicationFeedbackForm
