import React from 'react';
import profile_picture from '../imgrsr/profile.png';

export default function DevCard(props) {
  const user = props.user;

  const name = () => {
    return  `${user.lastname}, ${user.firstname}`;
  }

  return (
    <div className='dev-card'>
      <div className='dev-card-img'>
        <img className='dev-pic' src={profile_picture} alt='Profile Picture' />
      </div>
      <div className='dev-card-body'>
        <div className='dev-card-text'>
          <h2 className='dev-name'>{name()}</h2>
          <p className='dev-role'>{user.position}</p>
          <p className='dev-description'>Lorem ipsum blah blah blah x2 x2 x2 times two.</p>
          <p className='dev-location'>{user.address}</p>
        </div>
        <div className='dev-card-actions'>
          <a target='_blank' href='https://google.com'>Portfolio</a>
        </div>
      </div>
    </div>
  )
}
