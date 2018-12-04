import React from 'react';
import { Accordion, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const level1Panels = [
  { key: 'Tenting',
  title: 'What’s the difference between black, blue, and white tenting?',
  content: 'Tenting is split up into three periods of varying difficulty, black, blue and white. Requirements for each period can be found in the next question.' },
  { key: 'panel-ba', title: 'How many people have to be in K-Ville?',
  content: 'Black Tenting: 2 during the day, 10 at night, Blue Tenting: 1 during the day, 6 at night, White Tenting: 1 during the day, 2 at night' },
  { key: 'panel-ba', title: 'What does it mean to Dirty Black/Blue tent?',
  content: 'Tents that begin on the first day of either the Black or Blue tenting period are not ordered immediately. Order for these tents is based on attendance at other sporting events during tenting season as well as a Duke Basketball trivia test. Dirty Tenting means that your tent began tenting after the first day of a tenting period, so your order is based only on when your tent started.' },
  { key: 'panel-2a', title: 'When do we get grace?',
  content: 'After every tent check for one hour. Two hours before and after a Men’s or Women’s home basketball game. One hour before and after a Men’s or Women’s away basketball game. Weather-related grace is given certain circumstances' },
]

const Level1Content = (
  <div>
    Frequently Asked Questions for Tenting
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

const level2Panels = [
  { key: 'KVille',
  title: 'Can I tent for Carolina and wait in line for other games at the same time?',
  content: 'Yes, but the use of tents for ranked walk-up line games in no way relates to tenting for the Carolina game. A group’s position in the line for Carolina does not dictate position in line for any other game and vice versa.' },
  { key: 'Kville2',
  title: 'Does Wilson Gym count as being in K-Ville?',
  content: 'No. If a check is called when you are inside Wilson Gym and you miss your check, you will recieve a missed check. ' },
  { key: 'Kville2',
  title: 'If I live near K-Ville, can I just run across Towerview Road to make a check?',
  content: 'No. If a check is called and you run across Towerview, you will recieve a missed check. ' },
]

const Level2Content = (
  <div>
    Frequently Asked Questions for K-Ville
    <Accordion.Accordion panels={level2Panels} />
  </div>
)

const level3Panels = [
  { key: 'WUL',
  title: 'How many people need to be in the Walk-Up Line in K-Ville at once?',
  content: 'Just 1/3 of your group needs to be in K-Ville at once. If you have a group of 3, just one of you needs to be in K-Ville. If you have a group of 6, two of you need to be in K-Ville and so on. ' },
  { key: 'WUL2',
  title: 'Can I tent for Carolina and wait in line for other games at the same time?',
  content: 'Yes, but the use of tents for ranked walk-up line games in no way relates to tenting for the Carolina game. A group’s position in the line for Carolina does not dictate position in line for any other game and vice versa.' },
]

const Level3Content = (
  <div>
    Frequently Asked Questions for Walk-Up Line During Regular Games
    <Accordion.Accordion panels={level3Panels} />
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: 'Tenting FAQs', content: { content: Level1Content } },
  { key: 'panel-2', title: 'K-Ville FAQs', content: { content: Level2Content } },
  { key: 'panel-3', title: 'WUL FAQs', content: { content: Level3Content } },
]

const FAQ = () => <Accordion defaultActiveIndex={0} panels={rootPanels} fluid styled />

export default FAQ;
