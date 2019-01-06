import React, { Component } from 'react';

// semantic-ui
import { Header, Image, Table } from 'semantic-ui-react';

// image
import * as defaultSrc from './../../../images/default_image.png';

class TeamTablePane extends Component {

  renderCellWithAvatar = user => {
    const { captain_id } = this.props.teamData;
    const isCaptain = user.id == captain_id;
    const src = user.avatarURL || defaultSrc;
    return (
      <Table.Cell>
        <Header as='h4' image>
          <Image src={src} rounded size='mini' />
          <Header.Content>
            {user.name}
            <Header.Subheader>
              {isCaptain ? 'Captain' : 'Member'}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
    );
  };

  render() {
    const { users } = this.props.teamData;
    return (
      <div>
        <Table
          celled
          striped
          definition
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              users.map(user =>
                <Table.Row>
                  {this.renderCellWithAvatar(user)}
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>

        </Table>
      </div>
    );
  }

}

export default TeamTablePane;
