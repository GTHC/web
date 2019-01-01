import React, { Component } from 'react';

import { Container, Menu, Card, Icon, Image, Message } from 'semantic-ui-react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from './../actions/router';

// logos
import * as kvilleLogo from './../images/kville.png';
import * as logo from './../images/gthc.png';

class About extends Component {
  handleClick = (e, data) => {
    // data.id is the id element in the component that is clicked
    switch (data.id) {
      case 'login':
          this.props.push('/login')
          return;
      case 'tenting101':
          this.props.push('/tenting101')
          return;
      default:
        return;
    }
  }

  render() {
    const { router, } = this.props;
    const path = router.location.pathname;

    return (
      <div>
          <Menu secondary>
          <Menu.Item header>
            <Image src={logo} size="tiny" />
          </Menu.Item>
            <Menu.Item
            id='tenting101'
            active={path === '/tenting101'}
            onClick={this.handleClick}
            >
              Tenting101
            </Menu.Item>
            <Menu.Item
             id='login'
             active={path === '/login'}
             onClick={this.handleClick}>
             <Icon name="sign in" />
             Login
             </Menu.Item>
          </Menu>
        <div className="about">
        <Container textalign="center" >
        <Card centered fluid color="blue" className="about-card">
          <Card.Content textAlign="center">
            <Message size='massive'> Meet the Team </Message>
            <Message
              size = 'massive'
              success
              header='Our Mission'
              content='Build a task management/scheduling application that can help support the K-Ville Tenters'
            />
            <Card.Group>
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

            <Card.Group centered>
              <Card centered>
                <Image rounded src='https://scontent.fhkg3-2.fna.fbcdn.net/v/t1.0-9/21032580_465472987157268_6322993883696927594_n.jpg?_nc_cat=111&_nc_ht=scontent.fhkg3-2.fna&oh=8dc37534d0513c91c50260adf6e4503d&oe=5CD55854' />
                <Card.Content>
                  <Card.Header> Anesu Mafuvadze </Card.Header>
                  <Card.Description> Anesu is part of the graduating class of 2020 studying Computer Science with a minor in Education. He enjoys all things basketball. His favorite basketball team is the Los Angeles Lakers. When he is not in his dorm, he can be found in Wilson gym playing pickup basketball. </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Admin
                  </a>
                </Card.Content>
              </Card>

              <Card centered>
                <Image rounded src='https://scontent.fhkg3-1.fna.fbcdn.net/v/t1.0-1/c0.0.959.959a/18622265_1872884956299375_8395037700206320293_n.jpg?_nc_cat=107&_nc_ht=scontent.fhkg3-1.fna&oh=c89d12ecf280bc4b70be9da2893732d2&oe=5C93A475' />
                <Card.Content>
                  <Card.Header> Abdulla Shahid </Card.Header>
                  <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
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
                size = 'massive'
                success
                header='Our Clients: K-Ville Tenters'
                content='Thank you to all of our incredible supporters, Professor Duval and the CS408 Course, and to Duke Basketball.'
              />
              <Image centered src={kvilleLogo} size='massive'/>
              <Card.Group>
              <Card centered>
                <Image rounded src='http://image.cdnllnwnl.xosnetwork.com/pics24/400/KN/KNUUGURFURIRDPP.20070212204646.jpg' />
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
              </Card.Group>
          </Card.Content>
        </Card>
        </Container>
        </div>
      </div>
    );
  }
}

// connecting to redux

const mapStateToProps = (state) => {
  return {
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      push: push,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

export {
  About
};
