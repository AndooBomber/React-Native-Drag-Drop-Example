import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  Text
} from "react-native";
import ImageList from "./src/modules/ImageList/ImageList";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#000000",
    fontSize: 40
  }
});
