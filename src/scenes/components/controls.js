import React, { Component } from "react";
import { Slider, View } from "react-native";
import { Container, Grid, Col, Row, Content, ListItem, Left, body, Right, Switch, Radio, Text, Icon, Badge, Button, Body } from 'native-base';

class SingleOption extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      option: props.option
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState(() => {
      return { option: nextProps.option }
    })
  }
  
  render () {
    const { option } = this.state
    return (
      <ListItem>
        <Left>
          <Text>
            {option.title}
          </Text>
        </Left>
        <Body>
          <Slider
            minimumTrackTintColor="#4e4e4e"
            value={option.value}
            minimumValue={option.min}
            maximumValue={option.max}
            onSlidingComplete={(value) => {
              this.setState(() => {
                return {
                  option: Object.assign({}, this.state.option, { value: value })
                }
              })
              this.props.onChange(option, value)
            }}
          />
        </Body>
        <Right />
      </ListItem>
    )
  }

}

export const Controls = (props) => {
  return (
    <View>
      {
        props.options.map((option, index) => {
          return <SingleOption key={index} option={option} onChange={props.onChange} />
        })
      }
    </View>
  )
}
