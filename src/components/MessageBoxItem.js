/**
 * Created by Administrator on 2018/1/18.
 */
/**
 * Created by Administrator on 2017/10/27.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions,TouchableOpacity } from 'react-native';
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

export default class MessageBoxItem extends React.PureComponent {

    _goToComment=()=>{
        Actions.comment({title:"留言",nowid:this.props.title.vid})
    }
    render() {
        console.log('11111111121212222222222222222222222',this.props.title)
        return (


                <Item  onPress={()=>this._goToComment()}  style={{paddingTop:20,paddingBottom:20,backgroundColor:'#fff'}}   >
                    <Thumbnail style={{width:50,height:50,marginRight:15,marginLeft:15}}  source={{uri:this.props.title.touxiang}} />
                    <Col>
                        <Text style={{fontSize:14,color:'#000',marginBottom:5}}>你有一条新的回复消息</Text>
                        <Text note>{this.props.title.create_datetime}</Text>
                    </Col>
                </Item>


        )
    }
}