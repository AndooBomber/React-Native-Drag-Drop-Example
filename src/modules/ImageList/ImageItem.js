import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default class ImageItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;

    return (
      <View style={styles.container}>
        <Image style={style} source={{ uri: this.props.item }} />
        <TouchableOpacity
          style={styles.cancel}
          onPress={this.props.onPress(this.props.index)}
        >
          <View style={styles.delete}>
            <View style={{ top: -4, position: "relative" }}>
              <Text style={styles.mult}>×</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cancel: {
    position: "absolute",
    top: 0,
    right: 0
  },
  mult: {
    color: "#ffffff",
    fontSize: 16
  },
  delete: {
    top: -7,
    left: 3,
    width: 20,
    height: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#ff0000",
    backgroundColor: "#ff0000"
  }
});
