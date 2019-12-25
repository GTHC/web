import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from '../actions/router';

// components
import NavBarAlternate from './NavBarAlternate';

// semantic-ui
import { Container, Menu, Card, Icon, Image, Message, Header} from 'semantic-ui-react';

// logos
import * as kvilleLogo from './../images/kville.png';
import * as logo from './../images/gthc_verbose.png';

class AboutUs extends Component {

  render() {
    const { router, } = this.props;
    const path = router.location.pathname;

    return (
      <div>
        <NavBarAlternate />
        <div className="aboutus">
        
        <Container textalign="center" >
        <Header 
            size='huge'
            content="Meet The Team"
            textAlign="center"
            style={{
            fontSize: '4em',
            }}/>
          <Card centered fluid color="blue" className="about-card">
            <Card.Content textAlign="center">
              <Card.Group>
                <Card centered>
                  <Image src='https://i.imgur.com/MTS8Gg9.jpg' size='medium'/>
                  <Card.Content>
                  <Card.Header>Aman Ibrahim</Card.Header>
                  <Card.Meta>One of the Three Amigos</Card.Meta>
                  <Card.Description> Aman Ibrahim, a North Carolina native, is a Duke student in the class of 2020. He is a Computer Science major, and is working towards an Islamic Studies Certificate and an Electrical and Computer Engineering minor. He is incredibly versed in web development and is a full stack engineer. </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                  <Icon name='user' />
                  Founder
                </a>
                </Card.Content>
              </Card>

             

              <Card centered>
                <Image src='https://i.imgur.com/9aBaBVM.jpg'/>
                <Card.Content>
                  <Card.Header> Vinit Parekh </Card.Header>
                  <Card.Meta> One of the Three Amigos </Card.Meta>
                  <Card.Description> Vinit is part of the graduating class of 2020 studying a combination of Neuroscience, Computer Science, and Statistics. He is involved with many organizations on campus like Fix My Campus and Scale and Coin to name a few. This is his first web development project, and he thanks his teammates Aman, Anesu, and Rikki  for teaching and helping him about full stack web development.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Co-Founder
                  </a>
                </Card.Content>
              </Card>

              <Card centered>
                <Image src='https://i.imgur.com/rdxlOsq.jpg' />
                <Card.Content>
                  <Card.Header> Rikki Kendall </Card.Header>
                  <Card.Meta> One of the Three Amigos </Card.Meta>
                  <Card.Description> Rikki is part of the graduating class of 2020 studying Computer Science with an AMES Minor. He is a member of the Line Monitors, Air Force ROTC, and DEID Bolivia where he built two bridges the past two summers. Rikki intends to commission as a 2nd Lieutenant in the United States Air Force once he graduates. </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Co-Founder
                  </a>
                </Card.Content>
              </Card>
              </Card.Group>

              <Card.Group centered>
                <Card centered>
                  <Image rounded src='https://i.imgur.com/LGLJXsS.jpg' />
                  <Card.Content>
                    <Card.Header> Anesu Mafuvadze </Card.Header>
                    <Card.Description> Anesu is part of the graduating class of 2020 studying Computer Science with a minor in Education. He enjoys all things basketball. His favorite basketball team is the Los Angeles Lakers. When he is not in his dorm, he can be found in Wilson gym playing pickup basketball. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Co-Founder
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                  <Image rounded src='https://i.imgur.com/Ks3OAV1.jpg' />
                  <Card.Content>
                    <Card.Header> Abdulla Shahid </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Team Member
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                  <Image rounded src='https://i.imgur.com/BJNB5pt.jpg'/>
                  <Card.Content>
                    <Card.Header> Shamikh Hossain </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Team Member
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/aTQ8Uee.jpg'/>
                  <Card.Content>
                    <Card.Header> Ansh Nanda </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Team Member
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/srhOIE3.jpg'/>
                  <Card.Content>
                    <Card.Header> Sam Dale </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Team Member
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/IOWY7S9.jpg'/>
                  <Card.Content>
                    <Card.Header> Shyam Pradheep </Card.Header>
                    <Card.Description>  </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Team Member
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                  <Image rounded src='https://i.imgur.com/eKHGF1p.jpg' />
                  <Card.Content>
                    <Card.Header> Ahmad Khan </Card.Header>
                    <Card.Description>Ahmad is a class of 2022 undergraduate hailing from the suburbs of Chicago; he made the smart decision to ditch the Pratt track for a more casual lifestyle. He loves all things tech related, especially computer hardware and cars. Ahmad likes to build computers and window shop for rare sneakers in his free time: he hopes to design his own pair of kicks one day.</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/QdJCTFA.jpg'/>
                  <Card.Content>
                    <Card.Header> Ameer Syedibrahim </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/Fy1TH4H.jpg'/>
                  <Card.Content>
                    <Card.Header> Mohammad Khatami </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/9Y8t1Nn.jpg'/>
                  <Card.Content>
                    <Card.Header> Yasser Elmzoudi </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/PiXEG0z.jpg'/>
                  <Card.Content>
                    <Card.Header> Amjad Syedibrahim </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>

                <Card centered>
                <Image rounded src='https://i.imgur.com/g0QT2AK.jpg'/>
                  <Card.Content>
                    <Card.Header> Elijah Straight </Card.Header>
                    <Card.Description> Abdulla is a class of 2020 undergraduate majoring in Computer Science and Biology from Woodbridge, VA. He currently does research with Duke BME and Duke Neurology and is also involved with multiple clubs on campus such as Habitat for Humanity and Relay for Life. This is also Abdulla’s first web development project and he thanks all of his teammates for their guidance/coding wisdom. </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      Tern
                    </a>
                  </Card.Content>
                </Card>


                </Card.Group>

                
                
                <Image src={logo} size="large"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);

export {
  AboutUs
};