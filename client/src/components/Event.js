import React, { Component } from 'react'
import styled from 'styled-components'

export default class extends Component {
  render() {
    const { name, action, experience, avatar } = this.props.event.events
    
    return (
      <Item>
        <EventContainer className={ experience >= 150 ? 'large' : 'small' }>
          <RepoImage alt='repo avatar' src={ avatar}></RepoImage>
          <TextContainer className='text-container'>
            <h3>{ name }</h3>
            <h2>{ action }</h2>
            <h1>+{ experience }</h1>
          </TextContainer>
        </EventContainer>
      </Item>
    )
  }
}


const Item = styled.div`
  box-sizing: border-box;
  break-inside: avoid;
  counter-increment: item-counter;
  padding: 10px;
  
  img {
    width: 75px;
    border-radius: 100%;
    background-color: white;
  }
  
  h3 {
    font-size: 0.75em;
    color: #dedded;
  }
  
  h2 {
    font-size: 1em;
    color: #10121d;
  }
 
  h1 {
    font-size: 1em;
    color: #6a93ff;
  }
  
  .large {
    flex-direction: column;
    align-items: center;
    
    .text-container {
      margin-top: 20px;
      align-items: center;
    }
  }
  
  .small {
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    
    .text-container {
      align-items: flex-end;
    }
  }
`

const EventContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: #282840;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
`

const RepoImage = styled.img`
  width: 75px;
  border-radius: 100%;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Time = styled.h6`
  align-self: flex-end;
  margin-top: 15px;
  color: #4b4b67;
`

const Experience = styled.h3`
  margin-top: 7px;
  color: #6a93ff;
`