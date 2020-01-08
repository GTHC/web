import React, { Component } from "react";
import "./../styles/About.css";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "./../actions/router";

// components
import NavBarAlternate from "./NavBarAlternate";

// semantic-ui
import {
  Container,
  Menu,
  Card,
  Icon,
  Image,
  Message,
  Header
} from "semantic-ui-react";

// logos
import * as kvilleLogo from "./../images/kville.png";
import * as logo from "./../images/gthc_verbose.png";

class About extends Component {
  render() {
    const { router } = this.props;
    const path = router.location.pathname;

    return (
      <div>
        <NavBarAlternate />
        <div className="about">
          <div className="mission">
            <Container textalign="center">
              <Card centered fluid color="blue" className="about-card">
                <Card.Header
                  size="huge"
                  content="What is GTHC?"
                  style={{
                    fontSize: "4em",
                    padding: 30,
                    margin: 24
                  }}
                />

                <Card.Content textAlign="left">
                  <p>
                    GTHC is a web-based scheduling tool for Duke Krzyzewskiville
                    tenters. This platform prioritizes ease of use,
                    organization, optimization, and collaboration for each
                    tenter. In a single glance, GTHC will tell you the important
                    details of your team's shifts, and with a few clicks, your
                    team will know who, when, and what about any and all of your
                    shifts. GTHC will also bring you updates from your team, the
                    line monitors, and any important K-Ville news. Our end goal
                    is to make life as a tenter easier.
                  </p>
                </Card.Content>
              </Card>
            </Container>
          </div>
          <div className="origins">
            <Container textalign="center">
              <Card centered fluid color="blue" className="about-card">
                <Card.Header
                  size="huge"
                  content="Origins of GTHC"
                  style={{
                    fontSize: "4em",
                    padding: 30,
                    margin: 24
                  }}
                />
                <Card.Content textAlign="left">
                  <p>
                    The story of GTHC begins in February 2018 when Aman Ibrahim,
                    then a Duke sophomore, experienced his first tenting season
                    awaiting the Duke vs. UNC men's basketball game. Two weeks
                    before the end of tenting, his Dirty Black tent was booted
                    from Krzyzewskiville for missing two nightly tent checks.
                    Aman felt this was due to the team's not-so-organized method
                    of scheduling tent shifts over Google Sheets. Aman was
                    surprised he couldn't find an alternative solution, so after
                    being inspired by another peer, he decided it would be a
                    cool, fun, but not serious side project building out a
                    platform that would ease the difficulties of managing a
                    K-Ville tent.
                    <br></br>
                    <br></br>
                    By the summer of 2018, Aman was interning in San Francisco
                    and was also a Code2040 Fellow. At this point Aman had the
                    basic infrastructure of GTHC built, then called "Kville
                    Scheduler", and decided it would be interesting enough to
                    show his Fellowship mentor, a software engineer that was
                    working at Stripe. His mentor encouraged him to make this
                    project a real tool for other students to use, and with his
                    encouragement, Aman went to meet his good friend, Anesu
                    Mafuvadze, in Mountain View to propose the idea to him.
                    Anesu joins the team.
                    <br></br>
                    <br></br>
                    In Fall of 2018, Vinit Parekh, the founder of Fix My Campus
                    at Duke, was given the opportunity to propose the idea of a
                    Kville App to Duke Basketball with the help of Professor
                    Duvall's Computer Science 408 course, which connected
                    students to real-world clients to build software solutions.
                    Vinit came to the class as a client and proposed to the
                    group of students; among the group of students sat Aman, who
                    that day had begun moving on from the project as no progress
                    was made in months, and thought 408 would be a great way to
                    find an excuse to build software. As if it was fate, through
                    the 408 class, Vinit, Aman, Anesu, and Rikki Kendall began
                    working together to build the first iteration of GTHC for
                    the 2019 tenting season.
                  </p>
                  <br></br>
                  <br></br>
                </Card.Content>
              </Card>
            </Container>
          </div>

          <Image src={logo} size="large" centered />
        </div>
      </div>
    );
  }
}

// connecting to redux

const mapStateToProps = state => {
  return {
    router: state.router
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      push: push
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

export { About };
