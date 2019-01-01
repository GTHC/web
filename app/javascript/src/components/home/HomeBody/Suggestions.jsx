import React from 'react';
import { Accordion, Embed} from 'semantic-ui-react';



const level1Panels = [
  { key: 'panel-1a', title: 'Suggestions', content: 'Level 1A Contents' },
  { key: 'panel-ba', title: 'Questions', content: { content:  () => embedexampleForm }} ,
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

const embedexampleForm = (
  <Embed id='125292332' source='vimeo' />
)

const AccordionExampleNested = () => (
  <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
  );

export default AccordionExampleNested
