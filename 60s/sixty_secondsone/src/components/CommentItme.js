/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,} from 'react-native';
import {   Item,  Thumbnail , Text,Col} from 'native-base';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default class CommentItme extends React.PureComponent {
    render() {

        return (
            <View style={{backgroundColor:'#fff'}}>
                {this.props.title.length==0?(

                        <View style={{backgroundColor:'#fff',width:width,height:100,alignItems:'center',flexDirection:'row'}}>
                            <Thumbnail style={{width:50,height:50,marginLeft:15,marginRight:15}}  source={require('../img/icon_message.png')} />
                            <Text note>暂无评论快来评论吧</Text>
                        </View>

                    ):(
            <Item style={{paddingTop:20,paddingBottom:20,backgroundColor:'#fff'}}   >
                <Thumbnail style={{width:50,height:50,marginRight:15,marginLeft:15}}  source={{uri:this.props.title.touxiang}} />
                <Col>
                    <Text >{this.props.title.nickname}</Text>
                    <Text note>{this.props.title.content}</Text>
                </Col>
            </Item>
                    )}
            </View>
        )
    }
}