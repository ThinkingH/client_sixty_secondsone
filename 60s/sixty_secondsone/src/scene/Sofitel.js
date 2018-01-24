/**
 * Created by Administrator on 2017/10/20.
 */
import React, { Component } from 'react';
import {
    ListView, FlatList, View, Dimensions, Image, InteractionManager, DeviceEventEmitter,
    Platform,StatusBar
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import Storage  from '../utils/Storage';
import Config from '../utils/Config';
import { UltimateListView, UltimateRefreshView } from 'react-native-ultimate-listview'
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import PLVideoView from "../widget/PLVideoView";
//import UMSocialUtils from "../utils/UMSocialUtils";
import {LineDotsLoader,PulseLoader,DotsLoader,TextLoader,BubblesLoader,CirclesLoader,BreathingLoader,RippleLoader,LinesLoader,MusicBarLoader,EatBeanLoader
    ,DoubleCircleLoader,RotationCircleLoader,RotationHoleLoader,CirclesRotationScaleLoader,NineCubesLoader  ,ColorDotsLoader} from 'react-native-indicator';
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
        this._getData();
        // InteractionManager.runAfterInteractions(() => {
        //
        // this._getData();
        //
        // });
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

    _renderItem = (item, index, separator) => (
        <MyListItem key={item.id}
                    id={item.id}
                    onPressItem={this._onPressItem}
                    data={item}
        />
    );
    onFetch = async(_pageNo, startFetch, abortFetch) => {

        let parpam=null;
        parpam="thetype=1017&classtype=msgjihe&imgwidth=800&imgheight=450"+"&pagesize=10&page="+_pageNo;

        Request('1017',parpam)
            .then((responseJson) => {
                console.log("this.props.urlthis.props.urlthis.props.url",responseJson);
                let rowData =responseJson.data.list;
                    startFetch(rowData, 6)

            })
            .catch((error) => {
                abortFetch()
                console.log(error.toString())
                // Toast.show(error.toString());
            });



    };


    _renderPaginationFetchingView=()=> {
        return(
            <View style={{width:width, justifyContent: 'center', alignItems: 'center', height: 90,backgroundColor:'#f8f8f8'}}>
                <Text style={{color:'#666',fontSize:18}}>6 0 S e c
                </Text>
                {this._renderLoading()}
                {/*<Image ref={(c) => {this.txtPulling = c;}} source={require('../../src/img/icon_account_warn.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}
                {/*<Image ref={(c) => {this.txtPullok = c;}} source={require('../../src/img/icon_header.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}

                {/*<Image ref={(c) => {this.txtPullrelease = c;}} source={require('../../src/img/icon_search_result.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}

            </View>
        )
    };

    _renderLoading=()=>{
        return(
            <LineDotsLoader color={'#F5C61E'} />
        )
    };

    renderEmptyView=()=>{
        return(
            <View style={{width:width,height:height/2,alignItems:'center',justifyContent:'flex-end',backgroundColor:'#fff'}}>
                <Thumbnail square style={{width:width/2,height:width/2}} source={require('../img/icon_replaceimg.png')} />
            </View>
        )
    }

    _renderPagination=()=>{
        return(
            <View style={{width:width,height:50,alignItems:'center',justifyContent:'center'}}>
                <Text>正在加载中...</Text>
            </View>
        )
    };

    _renderPagin=()=>{
        return(
            <View style={{width:width,height:50,alignItems:'center',justifyContent:'center'}}>

            </View>
        )
    };

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>

                <UltimateListView

                    scrollEventThrottle={1}
                   // onScroll={(e)=>this._onScrollEnd(e)}

                    // columnWrapperStyle={{width:width/2}}

                    showsVerticalScrollIndicator={false}
                    //data={this.state.datas}
                    initialNumToRender={4}
                    extraData={this.state}
                    // keyExtractor={this.state.datas.id}
                    // renderItem={this._renderItem}
                    // ListHeaderComponent={this._header}
                   // ListFooterComponent={this._renderFooter()}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info) => {
                            this._toEnd()
                        } }
                    paginationBtnText={'正在载入'}
                    waitingSpinnerText={'正在载入'}
                    ref={ref => this.listViewa = ref}
                    key={this.state.layout} // this is important to distinguish different FlatList, default is numColumns
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
                    refreshableMode="advanced" // basic or advanced

                    item={this._renderItem} // this takes three params (item, index, separator)
                    numColumns={1} // to use grid layout, simply set gridColumn > 1
                    // customRefreshView={this._renderPaginationFetchingView()}
                    customRefreshView={()=>this._renderPaginationFetchingView()}
                    // ----Extra Config----
                    pagination={true}
                    autoPagination={true}
                   // header={this._header}
                    paginationFetchingView={this._renderPagination}
                    // sectionHeaderView={this.renderSectionHeaderView}   //not supported on FlatList
                    //paginationFetchingView={this._renderPaginationFetchingView}
                    paginationAllLoadedView={this._renderPagin}
                    paginationWaitingView={this._renderPagination}
                     emptyView={this.renderEmptyView}
                    // separator={this.renderSeparatorView}

                    // new props on v3.2.0
                    // arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    dateStyle={{ color: 'lightgray' }}
                    refreshViewStyle={Platform.OS === 'ios' ? { height: 90, top: -90 } : { height: 90 }}
                    refreshViewHeight={90}

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
                        <Text  style={{fontSize:10,color:'#f5c61e'}} >{this.props.data.create_date}</Text>
                        <Text style={{marginTop:5,fontSize:14,color:'#666'}}>{this.props.data.name}</Text>
                        <Text numberOfLines={2} note style={{marginTop:5,fontSize:12}}>{this.props.data.content}</Text>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

