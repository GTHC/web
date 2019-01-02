import React from 'react';
import { Accordion} from 'semantic-ui-react';


const level1Panels = [
  { key: 'panel-1a', title: 'Suggestions', content: 'Level 1A Contents' },
  { key: 'panel-ba', title: 'Questions', content: { content:embedquestionForm }} ,
]

const level1Content = (
  <div>
    Disclaimer: This section is for feedback on and questions about the tenting application
    <strong> NOT </strong> on the Tenting Process itself. Please direct those questions to linemonitors@gmail.com
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: 'Tenting Application FAQ and Feedback', content: { content: level1Content } },
]

const embedquestionForm = (
  <div>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdbyw2o6IqQekPAC8rfa66GDe_3heodU9pgy5unkj44l4g7bA/viewform?embedded=true" width="200" height="204" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
  </div>
)


const AccordionExampleNested = () => (
  <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
  );

export default AccordionExampleNested
