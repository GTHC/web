import React, { Component } from 'react';
import moment from 'moment';

import { Card, Message } from 'semantic-ui-react';

class MyShifts extends Component {

    constructor(props) {
        super(props);
    }

    filterShifts = (shift) => {
        // NOTE(anesu): We only want shifts from the next 7 days
        const daysToAdd = 7;

        const shiftStartTime = new Date(shift.start);
        const now = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(now.getDate() + daysToAdd); 


        return shiftStartTime > now && shiftStartTime < sevenDaysFromNow;
    }

    sortByEarliestShiftsFirst = (shift1, shift2)  => {
        return new Date(shift1.start) > new Date(shift2.start);
    }

    mapShiftToCard = (shift) => {
        const start = moment(new Date(shift.start))
            .calendar();
        const end = moment(new Date(shift.end))
            .format("h:mmA");
        const timeTillShift = moment(new Date(shift.start))
            .startOf(shift.start)
            .fromNow();

        return {
            header: shift.title,
            description: `${start} until ${end}`,
            meta: shift.note,
            extra: timeTillShift,
        }
    }

    render() {
        const items = this.props.user_shifts
            .filter(this.filterShifts)
            .sort(this.sortByEarliestShiftsFirst)
            .map(this.mapShiftToCard);

        return (
            <Card fluid raised style={{marginTop: "16px"}}>
                    <Card.Content>
                        <Card.Header>Upcoming Shifts</Card.Header>
                    </Card.Content>
                {items.length > 0
                    ? <Card.Group
                        items={items}
                        style={{ margin: "8px", marginTop: "0px" }} />
                    : <Message warning>
                        <Message.Header>You have no upcoming shifts!</Message.Header>
                        <p>Go to the Calendar to create shifts.</p>
                    </Message>}
           </Card>      
        );
    }

}

export default MyShifts;
