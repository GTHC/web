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
                  <Card.Meta>Class of 2020</Card.Meta>
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
                  <Card.Meta>Class of 2020</Card.Meta>
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
                  <Card.Meta> Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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
                    <Card.Meta>Class of 2020</Card.Meta>
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