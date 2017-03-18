import React, { Component } from "react";
import { Slider, View } from "react-native";
import {
  Container,
  Grid,
  Col,
  Row,
  Content,
  ListItem,
  Left,
  body,
  Right,
  Switch,
  Radio,
  Text,
  Icon,
  Badge,
  Button,
  Body
} from "native-base";

const SingleOption = props => {
  const { option } = props;
  return (
    <ListItem style={{ marginRight: 15 }}>
      <Left>
        <Text>
          {option.title}
        </Text>
      </Left>
      <Body>
        <Slider
          value={option.value}
          minimumValue={option.min}
          maximumValue={option.max}
          onSlidingComplete={value => {
            props.onChange(option, value);
          }}
        />
      </Body>
    </ListItem>
  );
};

export const Controls = props => {
  return (
    <View>
      {props.options.map((option, index) => {
        return (
          <SingleOption key={index} option={option} onChange={props.onChange} />
        );
      })}
    </View>
  );
};
