import React, { Component } from "react";
import CodePush, {
  CheckFrequency,
  InstallMode,
  sync
} from "react-native-code-push";

/**
 * Options
 */
const options = {
  checkFrequency: CheckFrequency.ON_APP_RESUME
};

const syncOptions = {
  updateDialog: true,
  installMode: InstallMode.IMMEDIATE
};

/**
 * Layer
 */
class CodePushComponent extends Component {
  componentDidMount() {
    sync(syncOptions);
  }

  render() {
    return this.props.children;
  }
}

export const CodePushLayer = CodePush(options)(CodePushComponent);
