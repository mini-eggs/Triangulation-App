import React from "react";
import { Header } from "native-base";

const styles = {
  Header: { borderColor: "transparent", borderBottomWidth: 0 }
};

export function HeaderContainer({ children }) {
  return (
    <Header noShadow style={styles.Header}>
      {children}
    </Header>
  );
}
