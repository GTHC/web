import React, { Component } from 'react';

import { Card, Container } from 'semantic-ui-react';

import NavBarAlternate from './NavBarAlternate';

class Privacy extends Component {

  render() {
    return (
      <div>
        <NavBarAlternate />
        <div className="about">
          <Container textalign="center" >
            <Card centered fluid color="blue" className="about-card">
              <Card.Content>
                <Card.Header>
                  <h1>GTHC Privacy Policy</h1>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <p>
                  GTHC operates <a href="https://www.gthc.io">gthc.io</a>. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use  Personal Information only to associate scheduling and announcement data to the corresponding user. By using the website and mobile application, you agree to the collection and use of information in accordance with this policy.
                </p>

                <h3>Information Collection And Use</h3>

                <p>
                  While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name netid, and phone number.
                </p>

                <h3>Log Data</h3>

                <p>
                  Like many site operators, we collect information that your browser sends whenever you visit our website or mobile application ("Log Data"). On the website, this Log Data may include information such as your Duke verification netid (username), when you are and are not available, your phone number, etc.
                </p>
                <p>
                  In addition, we may use third party services such as OneSignal that collect, monitor and analyze this Log Data in order to provide insight on the kind of devices being used and number of successful opened notifications. OneSignal will collect information like computer's Internet Protocol ("IP") address or Device ID, browser type, browser version, the pages of our website that you visit, the time and date of your visit.
                </p>


                <h3>Communications</h3>
                <p>
                  We use your Personal Information to contact you via push notifications with marketing or promotional materials.The information will relate to GTHC/ app related, tenting group, individual, Duke Basektball, and/or LIne Monitor Announcements.

                </p>
                <p>
                  Your information will not be sold or shared with anyone outside of Duke. Duke Administration may have access to your data if it is requested and you approve of your data use.
                </p>

                <h3>Cookies</h3>

                <p>
                  Cookies are files with small amount of data, which may include an anonymous unique identifier (netid). Cookies are sent to your browser from a web site and stored on your computer's hard drive. Like many sites, we use "cookies" to collect information. For instance, with cookies we can ensure you have logged into the site with your device before, so we can ensure you do not need to login to your device every time you access the website or mobile application. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
                </p>


                <h3>Security</h3>

                <p>
                  The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. For security purposes, we have implemented Duke OAuth to ensure only Duke students have access to the application.
                </p>


                <h3>Changes To This Privacy Policy</h3>

                 <p>
                   This Privacy Policy is effective as of December 26th, 2019 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                 </p>

                <h3>Contact Us</h3>

                <p>
                  If you have any questions about this Privacy Policy, please contact us <a href="mainto:duke.gthc@gmail.com">duke.gthc@gmail.com</a>.
                </p>

              </Card.Content>
            </Card>
          </Container>
        </div>
      </div>
    );
  }

}

export default Privacy;
