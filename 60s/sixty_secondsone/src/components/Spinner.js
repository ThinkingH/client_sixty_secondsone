/**
 * Created by Administrator on 2017/11/15.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions,DeviceEventEmitter,Modal } from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,Spinner} from 'native-base';
const {width, height} = Dimensions.get('window');

export default class Spinnera extends React.Component {





    render() {
       let isvisiable= this.props.modalVisible?this.props.modalVisible:false;
        return (
            <Modal
                   transparent={true}
                  // onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={isvisiable}
            >
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>

                    <View style={{width:width/1.1,height:100,backgroundColor:'transparent'}}>
                        <Card >
                            <View style={{width:width,height:90,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
                                <Spinner style={{marginLeft:20,padding:0}} color={'#999'} inverse={isvisiable}>

                                </Spinner>
                                <Text style={{marginLeft:20,color:'#8c8c8c'}}>{this.props.loadvalue}</Text>
                            </View>

                        </Card>

                    </View>

                </View>

            </Modal>
        )
    }
}