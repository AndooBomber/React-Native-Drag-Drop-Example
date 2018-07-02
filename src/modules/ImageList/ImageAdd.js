import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default class ImageAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.border, this.props.style]}>
          <Text style={{ color: "#d8d8d8", fontSize: 40 }}>+</Text>
        </View>{" "}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 3,
    borderStyle: "dashed",
    borderColor: "#d8d8d8",
    backgroundColor: "#fff"
  }
});
