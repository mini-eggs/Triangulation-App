import React from "react";
import { Platform } from "react-native";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";

const styles = {
  Icon: {}
};

export function HomeFooter({ icons = [] }) {
  return (
    <Footer style={{ borderColor: "transparent" }}>
      <FooterTab>
        <Button {...icons[0]}>
          <Icon name="md-time" style={styles.Icon} />
          <Text>Recent</Text>
        </Button>
        <Button {...icons[1]}>
          <Icon name="md-star" style={styles.Icon} />
          <Text>Featured</Text>
        </Button>
        <Button {...icons[2]}>
          <Icon name="md-camera" style={styles.Icon} />
          <Text>Create</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
