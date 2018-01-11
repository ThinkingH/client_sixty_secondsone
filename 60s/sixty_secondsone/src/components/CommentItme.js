/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,} from 'react-native';
import {   Item,  Thumbnail , Text,Col,ListItem,Row,Button} from 'native-base';
import { Actions } from 'react-native-router-flux';
import DateFormateUtils from "../utils/DateFormateUtils";

export default class CommentItme extends React.PureComponent {
    constructor(props){
        super(props)
    }

    renderSubItem=(item,i,fuc)=>{
        return(
            <Item key={i} style={{paddingTop:20,paddingLeft:20,paddingRight:20,margin:0,alignItems:"flex-start"}}>
                <View style={{marginRight:10}}>
                    <Thumbnail source={{uri:item.touxiang}} />
                </View>
                <Col style={{padding:0,margin:0}}>
                    <Text>{item.nickname}</Text>
                    <Text style={{fontSize:12, color:"#999999",marginTop:5}}>{DateFormateUtils.getDateDiff(item.create_datetime)}</Text>
                    <Text style={{marginTop:5}}>{item.content}</Text>
                    <Button transparent style={{alignSelf:"flex-end"}} onPress={()=>{
                        fuc&&fuc(item)
                    }}>
                        <Text style={{fontSize:12, color:"#999999"}}>回复</Text>
                    </Button>
                </Col>
            </Item>
        )
    }

    render() {
        const datas=[{item:"22"},{item:"22"},{item:"22"},{item:"22"}]
        return (
            <Item style={{paddingTop:20,paddingLeft:20,paddingRight:20,margin:0,alignItems:"flex-start"}}>
                <View style={{marginRight:10}}>
                    <Thumbnail source={{uri:this.props.title.touxiang}} />
                </View>
                <Col style={{padding:0,margin:0}}>
                    <Text>{this.props.title.nickname}</Text>
                    <Text style={{fontSize:12, color:"#999999",marginTop:5}}>{DateFormateUtils.getDateDiff(this.props.title.create_datetime)}</Text>
                    <Text style={{marginTop:5}}>{this.props.title.content}</Text>
                    <Button transparent style={{alignSelf:"flex-end"}} onPress={()=>{
                        this.props.callBack&&this.props.callBack(this.props.title)
                    }}>
                        <Text style={{fontSize:12, color:"#999999"}}>回复</Text>
                    </Button>
                    <View>
                    {
                        this.props.title.back&&this.props.title.back.map((item,i)=> this.renderSubItem(item,i,this.props.callBack))
                        //添加 子项目
                        //this.renderSubItem(this.props.title)
                    }
                    </View>
                </Col>
            </Item>
        )
    }
}

{/*<View style={{backgroundColor:'#fff'}}>
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
            </View>*/}