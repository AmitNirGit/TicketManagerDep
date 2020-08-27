import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

const Ticket = (props) => (
  <div className='ticket'>
    <div className='ticket-title'>{props.title}</div>
    <div className='ticket-description'>{props.content}</div>
    <div className='ticket-foot'>
      <span>
        Email:
        {props.userEmail}
      </span>{' '}
      ||
      <span>
        Creation time:
        {props.creationTime}
      </span>{' '}
      ||
      <span>
        {' '}
        Labeles:
        {props.labels !== undefined ? (
          props.labels.map((label) => (
            <span key={label} className='label'>
              {label}
            </span>
          ))
        ) : (
          <span>no labels</span>
        )}
      </span>
    </div>
    <div className='ticket-buttons'>
      <ButtonGroup
        size='small'
        variant='text'
        aria-label='text primary button group'>
        <Button
          onClick={() => {
            props.solvedHandler(props.id);
          }}>
          Solved
        </Button>
        <Button
          onClick={() => {
            props.unsolvedHandler(props.id);
          }}>
          unsolved
        </Button>
        <Button
          className='hideTicketButton'
          onClick={() => {
            props.hideHandler(props.id);
          }}>
          Hide
        </Button>
      </ButtonGroup>
    </div>
  </div>
);

export default Ticket;
