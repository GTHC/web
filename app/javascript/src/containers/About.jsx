import React from 'react'
import { Card, Icon, Image, Message} from 'semantic-ui-react'

const AboutPage = () => (
  <div align="middle">
    <Message size='massive'> Meet the Team </Message>
    <Card.Group centered>
      <Card centered>
        <Image src='https://avatars3.githubusercontent.com/u/13587407?s=400&v=4' />
        <Card.Content>
        <Card.Header>Aman Ibrahim</Card.Header>
        <Card.Meta>One of the Three Amigos</Card.Meta>
        <Card.Description> Aman Ibrahim, a North Carolina native, is a Duke student in the class of 2020. He is a Computer Science major, and is working towards an Islamic Studies Certificate and an Electrical and Computer Engineering minor. He is incredibly versed in web development and is a full stack engineer. </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <a>
        <Icon name='user' />
        Admin
      </a>
      </Card.Content>
    </Card>

  <Card centered>
    <Image src='https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/17390690_1287621711329761_1734721323901598994_o.jpg?_nc_cat=100&_nc_ht=scontent-iad3-1.xx&oh=9dcb42be2d19103f7e46cf93c25f37a7&oe=5C72FEED' />
    <Card.Content>
      <Card.Header> Vinit Parekh </Card.Header>
      <Card.Meta> One of the Three Amigos </Card.Meta>
      <Card.Description> Vinit is part of the graduating class of 2020 studying a combination of Neuroscience, Computer Science, and Statistics. He is involved with many organizations on campus like Fix My Campus and Scale and Coin to name a few. This is his first web development project, and he thanks his teammates Aman, Anesu, and Rikki  for teaching and helping him about full stack web development.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        Admin
      </a>
    </Card.Content>
  </Card>

  <Card centered>
    <Image src='https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/34142086_1929385717113887_2009316225124925440_o.jpg?_nc_cat=100&_nc_ht=scontent-iad3-1.xx&oh=bf70c8fdb9f2af69ac2ff6b874f8b591&oe=5C638327' />
    <Card.Content>
      <Card.Header> Rikki Kendall </Card.Header>
      <Card.Meta> One of the Three Amigos </Card.Meta>
      <Card.Description> Rikki is part of the graduating class of 2020 studying Computer Science with an AMES Minor. He is a member of the Line Monitors, Air Force ROTC, and DEID Bolivia where he built two bridges the past two summers. Rikki intends to commission as a 2nd Lieutenant in the United States Air Force once he graduates. </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        Admin
      </a>
    </Card.Content>
  </Card>
  </Card.Group>
  <Message
    centered
    size = 'Massive'
    success
    header='Our Mission'
    content='Build a task management /scheduling application that can help support the K-Ville Tenters' />
    <Card.Group centered>
    <Card centered>
      <Image size='40%' rounded src='http://image.cdnllnwnl.xosnetwork.com/pics24/400/KN/KNUUGURFURIRDPP.20070212204646.jpg' />
      <Card.Content>
        <Card.Header> Debbie Krzyzewski </Card.Header>
        <Card.Description> Debbie is one of our clients with Duke Basketball and has been incredible in supporting us throughout the process of building this application. Thank you so much for your help Debbie. </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          Client
        </a>
      </Card.Content>
    </Card>
    <Card centered>
      <Image src='https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/33493049_10157366811269325_20159270817366016_o.jpg?_nc_cat=111&_nc_ht=scontent-iad3-1.xx&oh=ba225586d37a1eab60ccc352471d83f2&oe=5CAF7EF5' size='100%' />
      <Card.Content>
        <Card.Header> Grant Besner </Card.Header>
        <Card.Description> Grant is one of our clients with the Tenters and has been incredible in supporting us throughout the process of building this application. Thank you so much for your help Grant. </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          Client
        </a>
      </Card.Content>
    </Card>
    </Card.Group>
    <Message size='massive'> Also a big Thank You to the CS408 Students and Faculty for your support! </Message>
  </div>
)

export default AboutPage
