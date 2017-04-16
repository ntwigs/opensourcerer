import React, { Component } from 'react'
import styled from 'styled-components'

export default class extends Component {
  render() {
    const { id, repo, type, created_at } = this.props.event

    return (
      <Item>
        <EventContainer className='item content large'>
          <RepoImage src='https://github.com/identicons/osc.png'></RepoImage>
          <TextContainer className='text-container'>
            <h3>{ type }</h3>
            <h2>MERGED</h2>
            <h1>Exp: +{ Math.ceil(id/100000000) }</h1>
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

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #282840;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  }
  
  .text-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
  img {
    width: 75px;
    border-radius: 100%;
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #282840;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 10px;
    
    .text-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
  }
  
  .small {
    height: 100px;
    position: relative;
    display: flex;
    flex-direction: row;
    background: #282840;
    border-radius: 2px;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 10px;
    
    .text-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`

const EventContainer = styled.div`

`

const RepoImage = styled.img`
  width: 75px;
  border-radius: 100%;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 75px;
`

const RightTextField = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
`

const LeftTextField = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
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