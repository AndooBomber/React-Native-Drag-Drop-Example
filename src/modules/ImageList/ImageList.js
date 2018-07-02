import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform
} from "react-native";
import SortableList from "react-native-sortable-list";
import ImageItem from "./ImageItem";
import ImageAdd from "./ImageAdd";

export default class ImageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          image:
            "http://fujifilm.jp/personal/digitalcamera/x/fujinon_lens_xf16mmf14_r_wr/sample_images/img/index/ff_xf16mmf14_r_wr_001.JPG"
        },
        { image: "https://pbs.twimg.com/media/CKBH3GXUMAE9eZv.jpg:large" },
        {
          image:
            "http://www.jma-net.go.jp/sat/data/web89/parts89/himawari9_first_image/tcr/tcr_m.jpg"
        }
      ],
      listBool: true,
      imageOrder: []
    };
  }

  _onPressDelete = index => () => {
    const { data, listBool, imageOrder } = this.state;
    let _data;
    if (imageOrder.length > 0) {
      _data = [];
      imageOrder.forEach(e => {
        _data.push(data[e]);
      });
    } else {
      _data = data.concat();
    }
    _data.splice(index, 1);
    if (!listBool) {
      this.setState({
        listBool: true
      });
    }
    this.setState({
      data: _data,
      imageOrder: Object.keys(_data)
    });
  };

  _onPressAdd = () => {
    const { data, imageOrder } = this.state;
    let _data;
    if (imageOrder.length > 0) {
      _data = [];
      imageOrder.forEach(e => {
        _data.push(data[e]);
      });
    } else {
      _data = data.concat();
    }
    _data = [
      ..._data,
      {
        image:
          "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
      }
    ];
    if (_data.length >= 5) {
      this.setState({
        listBool: false
      });
    }
    this.setState({
      data: _data,
      imageOrder: Object.keys(_data)
    });
  };

  _onChangeOrder(nextOrder) {
    this.setState({
      imageOrder: nextOrder
    });
  }

  _onSave = () => {
    const { data, imageOrder } = this.state;
    let _data;
    if (imageOrder.length > 0) {
      _data = [];
      imageOrder.forEach(e => {
        _data.push(data[e]);
      });
      this.setState({
        data: _data
      });
    }
  };

  render() {
    const { data, listBool } = this.state;
    const Add = listBool ? (
      <ImageAdd onPress={this._onPressAdd} style={styles.image} />
    ) : null;
    var dataObj = {};
    data.forEach((img, index) => {
      dataObj[index] = img;
    });
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native drag&drop example</Text>
        <Text style={styles.count}>{data.length}/5</Text>
        <View>
          <SortableList
            horizontal
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={dataObj}
            renderRow={this._renderRow}
            onChangeOrder={this._onChangeOrder.bind(this)}
            scrollEnabled={false}
          />
          {listBool && (
            <View
              style={{
                position: "relative",
                top: -180,
                left: (window.width / 5) * data.length
              }}
            >
              <ImageAdd onPress={this._onPressAdd} style={styles.image} />
            </View>
          )}
        </View>
      </View>
    );
  }

  _renderRow = ({ data, active, index }) => {
    return (
      <Row
        data={data}
        active={active}
        index={index}
        onPress={index => this._onPressDelete(index)}
      />
    );
  };
}

class Row extends Component {
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { data, index, onPress } = this.props;
    return (
      <Animated.View style={[styles.row, this._style]}>
        <ImageItem
          item={data.image}
          style={styles.image}
          index={index}
          onPress={index => onPress(index)}
        />
      </Animated.View>
    );
  }
}

const window = Dimensions.get("window");

const IMG_MARGINE = 3;

const ITEM_SIZE = (window.width - IMG_MARGINE * 10) / 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999"
  },

  list: {
    height: 210,
    width: window.width
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30
      },

      android: {
        paddingVertical: 0
      }
    })
  },

  row: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: IMG_MARGINE,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        elevation: 0,
        marginHorizontal: 30
      }
    })
  },

  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE
  },

  border: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 3,
    borderStyle: "dashed",
    borderColor: "#d8d8d8",
    backgroundColor: "#fff"
  }
});
