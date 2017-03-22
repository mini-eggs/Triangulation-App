import React from "React";
import { Body, Title, Subtitle } from "native-base";

export function HeaderText({ title, subtitle }) {
  return (
    <Body>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Body>
  );
}
