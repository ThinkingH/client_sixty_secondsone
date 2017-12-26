/**
 * Created by Administrator on 2017/10/20.
 */
import React, { Component } from 'react';
import {
    ListView, FlatList, View, Dimensions, Image, InteractionManager, DeviceEventEmitter,
    Platform
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import Storage  from '../utils/Storage';
import Config from '../utils/Config';

import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import PLVideoView from "../widget/PLVideoView";
//import UMSocialUtils from "../utils/UMSocialUtils";

const data = [
    {"name" : "Melody", age: 21,id:1},
    {"name" : "ZZ", age: 22,id:2},
    {"name" : "ZZ", age: 22,id:3},
    {"name" : "ZZ", age: 22,id:4},
    {"name" : "ZZ", age: 22,id:5},
    {"name" : "ZZ", age: 22,id:6},
    {"name" : "ZZ", age: 22,id:7},
    {"name" : "ZZ", age: 22,id:8},
    {"name" : "ZZ", age: 22,id:9},
    {"name" : "ZZ", age: 22,id:10},

];
const {width, height} = Dimensions.get('window');
let _pageNo = 1;
export default class Sofitel extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            refreshing:false,
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

        this._getData();

        });
    }
    _onRefresh=()=> {
        this.setState({
            refreshing:true,
        });
       _pageNo = 1;

        this._getData(_pageNo);

    };

    _getData=(_pageNo)=>{
        let parpam="thetype=1017&classtype=msgjihe&imgwidth=800&imgheight=450"+"&pagesize=10&page="+_pageNo;
        Request('1017',parpam)
            .then((responseJson) => {
            this.setState({
                data:responseJson.data.list,
                refreshing:false,
            })

            })
            .catch((error) => {
                this.setState({
                    refreshing:false,
                })
                Toast.show("网络请求失败");
            });
    }

    _onPressItem = () => {
        // updater functions are preferred for transactional updates
        alert("aaa");
        // UMSocialUtils.init("sasa");
        //  UMSocialUtils.shareWeixin()
    };

    _renderItem = ({item}) => (
        <MyListItem key={item.id}
                    id={item.id}
                    onPressItem={this._onPressItem}
                    data={item}
        />
    );

    _header = () => {
        return(<MyListHeader/>);
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fafafa'}}>
                {Platform.OS=='ios'?(null):(

                        <Header style={{height:0}} androidStatusBarColor='#c5b061'/>

                )}
                <FlatList

                    ref={(FlatList)=>this.FlatList=FlatList}
                    // columnWrapperStyle={{width:width/2}}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    initialNumToRender={4}
                    //extraData={this.state}
                    keyExtractor={data.id}
                    renderItem={this._renderItem}
                    //  ListHeaderComponent={this._header}
                />
            </View>

        );
    }
}


class MyListItem extends React.PureComponent {
    render() {
        return (
            <Card   style={{marginLeft:5,marginRight:5,borderRadius:10}} >
                <CardItem style={{backgroundColor:'#ccc',borderTopLeftRadius:10,borderTopRightRadius:10}}  onPress={()=>Actions.sofitellist({id:this.props.data.jiheid,datas:this.props.data,title:this.props.data.name})} button={true}  cardBody>
                    <Image source={{uri:this.props.data.showimg}} style={{height: width/16*9, width: null,flex:1,borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                </CardItem>
                <CardItem style={{borderBottomLeftRadius:10,borderBottomRightRadius:10}} button={true} onPress={()=>Actions.sofitellist({id:this.props.data.jiheid,datas:this.props.data})} >
                    <View >
                        <Text  style={{fontSize:10,color:'#C5B061'}} >{this.props.data.create_date}</Text>
                        <Text style={{marginTop:5,fontSize:14,color:'#666'}}>{this.props.data.name}</Text>
                        <Text numberOfLines={2} note style={{marginTop:5,fontSize:12}}>{this.props.data.content}</Text>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

