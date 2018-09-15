import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';
import {Flex} from 'antd-mobile-rn'

export default class TakePicture extends Component {

    state = {
        type: Camera.constants.Type.back
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    cropToPreview={true}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type={this.state.type}
                >
                    <Flex direction={"row"} justify={"around"}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>拍照</Text>
                        <Text style={styles.capture} onPress={this.changeCamera.bind(this)}>切换</Text>
                    </Flex>
                </Camera>
            </View>
        );
    }

    changeCamera() {
        let type = Camera.constants.Type.back;
        if (this.state.type === Camera.constants.Type.back) {
            type = Camera.constants.Type.front
        }
        this.setState({
            type
        })
    }

    onBarCodeRead(e) {
        console.log(
            "Barcode Found!",
            "Type: " + e.type + "\nData: " + e.data
        );
    }

    takePicture() {
        const options = {};
//options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});