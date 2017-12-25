/**
 * Created by Administrator on 2017/10/27.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions } from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Item,Body,Right,Switch ,Card, Col,Row} from 'native-base';
import { Actions } from 'react-native-router-flux';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default class MessageItem extends React.PureComponent {
    render() {
        return (
            <View style={{backgroundColor:'#fff'}}>
                {this.props.title.length==0?(

                <View style={{backgroundColor:'#fff',width:width,height:100,alignItems:'center',flexDirection:'row'}}>
                    <Thumbnail style={{width:50,height:50,marginLeft:15,marginRight:15}}  source={require('../img/icon_message.png')} />
                    <Text note>暂无消息</Text>
                </View>

            ):(
                <Item style={{paddingTop:20,paddingBottom:20,backgroundColor:'#fff'}}   >
                    <Thumbnail style={{width:50,height:50,marginRight:15,marginLeft:15}}  source={require('../img/icon_message.png')} />
                    <Col>
                        <Text style={{fontSize:14,color:'#000',marginBottom:5}}>{this.props.title.message}</Text>
                        <Text note>{this.props.title.create_date}</Text>
                    </Col>
                </Item>
            )}
            </View>
        )
    }
}