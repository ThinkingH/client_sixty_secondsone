import React, { Component } from 'react';
import { Image,ListView,StyleSheet,Dimensions,ImageBackground,findNodeHandle,TouchableOpacity,InteractionManager,DeviceEventEmitter,TouchableNativeFeedback,RefreshControl,Animated,StatusBar } from 'react-native';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header,View, Content, Button, Icon, List, Text, ListItem,Left,Right,Body ,Thumbnail,Row} from 'native-base';
import TabIcon from '../components/TabIcon';
import { BlurView, VibrancyView } from 'react-native-blur';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: -5,
        backgroundColor:'#ccc'
    },
});
export default class Account extends Component {

    static navigationOptions = {
        //tabBarLabel: Config.navs_txt[3],
        tabBarIcon: ({focused,tintColor}) => (<Image source={focused ?Config.icons_s[3]:Config.icons[3]}/>)
    };

    constructor(props) {
        super(props);
        this.state = {
             arr:[],
            imageheader:null,
            title:"mzy",
            name:'我的',
            desc:'',
            viewRef:null,
            isshow:true,
            isRefreshing:false,
            imgscale:new Animated.Value(1),//图片缩放
            iscontribute:true,
            viewopacity:'transparent',
            navibaropacity:0,
        };
    }

    componentDidMount(){


       this.getInfo = DeviceEventEmitter.addListener("getinfo",this._updatelogin);
        this.onFresh = DeviceEventEmitter.addListener("onFresh",this._onFresh);
        InteractionManager.runAfterInteractions(() => {
            if(Config.usertype==1){
                this._onFresh();
            }
        });
    };
    _onFresh=()=>{
        this._getInfo();
        this._getContributeList()
    }

    _updatelogin=()=>{
        this.setState({
            name:this.props.aaname,
        });
        if(Config.usertype==1){
            this._getInfo();
        }
    };

    componentWillUnmount(){
       this.getInfo.remove();
        this.onFresh.remove();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isaccountinfo==true){
            this._getInfo();
        }
    }


    _getContributeList=()=>{

        let parpam="thetype=1019&typeid=2";
        Request('1019',parpam)
            .then((responseJson) => {
                console.log("投稿的获取",responseJson.data.list)
                this.setState({
                    arr:responseJson.data.list
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _getInfo=()=>{
        this.setState({
            isRefreshing:true,
        })
        let parpam="thetype=1005";
        Request('1005',parpam)
            .then((responseJson) => {
               this.setState({
                   name:responseJson.data.nickname,
                   desc:responseJson.data.describes,
                   imageheader:responseJson.data.touxiang,
                   isRefreshing:false,
               })
            })
            .catch((error) => {
                this.setState({
                    isRefreshing:false,
                })
                Toast.show(error.toString());
            });
    };

    _getInf=()=>{

        let parpam="thetype=1031";
        Request('1031',parpam)
            .then((responseJson) => {
                console.log('responseJson',responseJson)
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    imageLoaded=()=> {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    _renderUnLogin=()=>{
        return(

                <Content style={{backgroundColor:'#fafafa'}}>
                    <Body style={{flex:1}}>
                        <ImageBackground   style={{width:width,height:width,justifyContent:'flex-end',alignItems:'center'}}
                                           source={require('../img/noob.png')} >
                            <Button  rounded block onPress={()=>Actions.login2()}  style={{backgroundColor:'#c5b361',width:width-60,height:40,marginLeft:30}}>
                                <Text style={{fontSize:16,color:'#fff'}} >用  户  登  录</Text>
                            </Button>
                        </ImageBackground>
                        <Text  style={{marginTop:20,color:'#8c8c8c',fontSize:14,}}>您还没有登录，请登陆后操作</Text>
                    </Body>
                </Content>

        )
    };

    _renderLogin=()=>{
        return(
            <Container  style={{backgroundColor:'#fafafa'}}>
                <Content  style={{backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}
                          onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.state.imgscale}}}])}
                         refreshControl={
                            <RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={ this._onFresh}
							tintColor="#000"
							colors={['#000', '#000', '#000']}
							progressBackgroundColor="white"/>
                         } >
                    <Body style={{alignItems:'center',height:width/750*300+45,}}>
                    <Thumbnail square  style={{width:width,height:width/750*300}} source={require('../img/icon_account_bg.png')} ></Thumbnail>
                    <Animated.Image    style={[{position:'absolute',top:width/750*300-40,width:80,height:80,borderRadius:40,borderWidth:2,borderColor:'#fff'},
                    {transform:[
                        {scale: this.state.imgscale.interpolate({
                                  inputRange:[0,width/750*300],
                                  outputRange:[1,0]})
                          },
                      ]}]}
                               source={this.state.imageheader==null?require('../img/icon_logobg.png'):{uri:this.state.imageheader}}
                    />
                    {/*{this.state.isshow?(*/}
                            {/*<Image    style={{position:'absolute',top:width/750*300-40,width:80,height:80,borderRadius:40,borderWidth:2,borderColor:'#fff'}}*/}
                                      {/*source={require('../img/icon_logobg.png')}*/}

                            {/*/>*/}
                        {/*):(null)}*/}

                    </Body>
                    <Body >
                    <Text style={{marginBottom:20,paddingLeft:20,paddingRight:20}}>{this.state.name}</Text>
                    <Text style={{marginBottom:20,paddingLeft:20,paddingRight:20,fontSize:14,color:'#777'}}>{this.state.desc}</Text>
                    </Body>
                    <Body >
                    <Button transparent={true} block  style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#8c8c8c',height:30,width:width/2.5}}
                            onPress={()=>Actions.accountinfo({image:this.state.imageheader,namea:this.state.name,desc:this.state.desc})}>
                        <Text style={{color:'#8b8b8b',fontSize:14}}>修改个人资料</Text>
                    </Button>
                    </Body>
                    <View style={{width:width,height:1,backgroundColor:'#eeeeee',marginTop:20,marginBottom:15}} >
                    </View>
                    <Body  >

                    <Text style={{marginBottom:15,color:'#C5B061'}}>我的成果展示</Text>
                    <View style={{width:width,height:1,backgroundColor:'#eeeeee',}} ></View>
                    </Body>
                    {this.state.arr.length==0?(
                            <Body style={{height:100,width:width,backgroundColor:'#fafafa'}}>
                            <Text note style={{marginTop:30}}>暂无投稿,快去投稿吧！</Text>
                            </Body>
                        ):(
                            <Row style={{ flexWrap: 'wrap'}}>
                                {this.state.arr.map((item, i)=>
                                    <TouchableNativeFeedback  key={i}
                                                              onPress={()=>Actions.contributedetails({id:item.id})}
                                                              background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                                        <Thumbnail square  style={{width:width/3,height:width/3,borderWidth:1,borderColor:'#fff'}} source={{uri:item.showimg}} />
                                    </TouchableNativeFeedback>
                                )}
                            </Row>
                        )}
                </Content>
            </Container>
        )
    }

    _exchange=()=>{
        this.setState({
            iscontribute:!this.state.iscontribute
        })
    }

    _renderContribute=()=>{
        return (

                this.state.iscontribute?(
                        <View style={{width:width-40,backgroundColor:'#ffffff',borderRadius:10,marginTop:20}}>
                        <View style={{width:width-40,height:40,flexDirection:'row'}}>
                            <TouchableOpacity activeOpacity={0.9} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#DDCE53'}}>我的成果展示</Text>
                                <View style={{width:(width-40)/2,height:1,backgroundColor:'#ddce53',position:'absolute',bottom:0}}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._exchange()}} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14}}>我的上传食谱</Text>

                            </TouchableOpacity>
                        </View>
                            {this._renderContributeList()}
                        </View>
                    ):(
                        <View style={{width:width-40,backgroundColor:'#ffffff',borderRadius:10,marginTop:20}}>
                        <View style={{width:width-40,height:40,flexDirection:'row'}}>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._exchange()}} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14}}>我的成果展示</Text>

                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#DDCE53'}}>我的上传食谱</Text>
                                <View style={{width:(width-40)/2,height:1,backgroundColor:'#ddce53',position:'absolute',bottom:0}}>

                                </View>
                            </TouchableOpacity>
                        </View>
                            {this._renderUploadList()}
                        </View>
                    )


        )
    }

    _renderUploadList=()=>{
        return (
            <View style={{flex:1}}>
                {this.state.arr.length==0?(
                        <Body style={{height:100,width:width,backgroundColor:'#fafafa'}}>
                        <Text note style={{marginTop:30}}>暂无投稿,快去投稿吧！</Text>
                        </Body>
                    ):(
                        <Row style={{ flexWrap: 'wrap'}}>
                            {this.state.arr.map((item, i)=>
                                <TouchableOpacity activeOpacity={0.9} style={{width:(width-40),backgroundColor:'#ccc',marginBottom:15}}  key={i}
                                                  onPress={()=>Actions.contributedetails({id:item.id})}
                                >
                                    <Image resizeMode={'cover'}  style={{width:(width-40),height:(width-40)/16*9,}} source={{uri:item.showimg}} />
                               <View style={{width:width-40,backgroundColor:'#fff'}}>
                                   <Text style={{fontSize:14,marginTop:10}}>食谱名字</Text>
                                   <Text style={{fontSize:10,color:'#aaa',lineHeight:12}}>12小时前发布</Text>
                                   <Text numberOfLines={3} style={{fontSize:12,color:'#666',lineHeight:14,marginTop:5}}>超级好吃的菜满汉全席吃的不亦乐乎超级好吃的菜满汉全席吃的不亦乐乎超级好吃的菜满汉全席吃的不亦乐乎超级好吃的菜满汉全席吃的不亦乐乎</Text>
                               </View>
                                </TouchableOpacity>
                            )}
                        </Row>
                    )}
            </View>
        )
    }

    _renderContributeList=()=>{
        return (
            <View style={{flex:1}}>
                {this.state.arr.length==0?(
                        <Body style={{height:100,width:width,backgroundColor:'#fafafa'}}>
                        <Text note style={{marginTop:30}}>暂无投稿,快去投稿吧！</Text>
                        </Body>
                    ):(
                        <Row style={{ flexWrap: 'wrap'}}>
                            {this.state.arr.map((item, i)=>
                                <TouchableOpacity activeOpacity={0.9} style={{width:(width-40)/2,height:(width-40)/2,borderWidth:1,borderColor:'#fff',backgroundColor:'#ccc'}}  key={i}
                                                  onPress={()=>Actions.contributedetails({id:item.id})}
                                >
                                    <Thumbnail square  style={{width:(width-40)/2,height:(width-40)/2,borderWidth:1,borderColor:'#fff'}} source={{uri:item.showimg}} />
                                </TouchableOpacity>
                            )}
                        </Row>
                    )}
            </View>
        )
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    _onScrollEnd=(e)=>{
        if(e.nativeEvent.contentOffset.y<=60){
            this.viewopacity.setNativeProps({
                style: {backgroundColor:'rgba(197,179,97,'+e.nativeEvent.contentOffset.y/60+')'}
            });
        }else if(e.nativeEvent.contentOffset.y>60){
            this.viewopacity.setNativeProps({
                style: {backgroundColor:'rgba(197,179,97,'+e.nativeEvent.contentOffset.y/60+')'}
            });
        }

        if(e.nativeEvent.contentOffset.y<=60){
            this.navibar.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/60}
            });
        }else if(e.nativeEvent.contentOffset.y>60){
            this.navibar.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/60}
            });
        }

        if(e.nativeEvent.contentOffset.y<=60){
            this.navibara.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/60}
            });
        }else if(e.nativeEvent.contentOffset.y>60){
            this.navibara.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/60}
            });
        }
    }

    _renderLogina=()=>{
        return (
            <Container  style={{backgroundColor:'#fafafa'}}>
                <Content onScroll={(e)=>this._onScrollEnd(e)}  style={{backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}
                        //  onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.state.imgscale}}}])}
                          refreshControl={
                            <RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={ this._onFresh}
							tintColor="#000"
							colors={['#000', '#000', '#000']}
							progressBackgroundColor="white"/>
                         } >
                {/*<ImageBackground   style={{position:'absolute',top:0,width:width,height:width,alignItems:'center'}}*/}
                                   {/*source={require('../img/icon_contribute_modalpic.png')} >*/}

                {/*</ImageBackground>*/}
                    <View style={{position:'absolute',top:0,width:width,height:width,alignItems:'center'}}>
                        <Image
                            ref={(img) => { this.backgroundImage = img; }}
                            source={{uri:this.state.imageheader}}
                            style={styles.absolute}
                            onLoadEnd={this.imageLoaded.bind(this)}
                        />
                        <BlurView overlayColor='rgba(30,30,30,0.3)'
                            style={styles.absolute}
                            viewRef={this.state.viewRef}
                            blurType="dark"
                            blurAmount={5}
                        />
                    </View>


                    <ImageBackground   style={{position:'absolute',top:0,width:width,height:width,alignItems:'center'}}
                                       source={require('../img/icon_replace.png')} >

                    </ImageBackground>

                <View style={{width:width,alignItems:'center',}}>
                    <View style={{width:width-40,backgroundColor:'#ffffff',borderRadius:10,marginTop:Config.STATUSBARHEIGHT+60}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{width:width/5,height:width/5,borderRadius:width/10,margin:20,backgroundColor:'#ccc'}}>
                            <Thumbnail square  style={{width:width/5,height:width/5,borderRadius:width/10}}  source={{uri:this.state.imageheader}}/>
                            </View>
                            <Text style={{fontSize:16,marginLeft:10}}>{this.state.name}</Text>
                        </View>
                        <View style={{width:width-40,height:1,backgroundColor:'#ccc'}}>

                        </View>
                        <View style={{alignItems:'center',height:50}}>
                            <Text style={{fontSize:12}}>{this.state.desc}</Text>
                        </View>

                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={{position:'absolute',right:0,top:Config.STATUSBARHEIGHT+50+width/10}}
                                      onPress={() => {Actions.accountinfo({image:this.state.imageheader,namea:this.state.name,desc:this.state.desc})}} >
                        <View style={{height:30,borderBottomLeftRadius:15,borderTopLeftRadius:15,backgroundColor:'#C5B361',flexDirection:'row',alignItems:'center',marginTop:10,right:0}}>
                            <Text style={{marginLeft:5,marginRight:5,marginLeft:10,color:'#fff',fontSize:12}}>修改个人资料</Text>
                        </View>
                    </TouchableOpacity>

                    {this._renderContribute()}

                </View>
                </Content>
            </Container>
        )
    }

    render() {
        return (
            <Container  style={{backgroundColor:'#fafafa'}}>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                {Config.usertype==1?this._renderLogina():this._renderUnLogin()}
                <View ref={(viewopacity)=>this.viewopacity=viewopacity}
                      style={{position:'absolute',top:0,width:width,height:StatusBar.currentHeight,backgroundColor:this.state.viewopacity}}>
                </View>
                <View ref={(navibar)=>this.navibar=navibar}
                      style={{position:'absolute',top:StatusBar.currentHeight,width:width,height:50,opacity:this.state.navibaropacity,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                </View>
                <View ref={(navibar)=>this.navibara=navibar}
                      style={{position:'absolute',top:StatusBar.currentHeight,width:width,height:50,
                      opacity:this.state.navibaropacity,justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>{this.state.name}</Text>
                </View>
                <View  style={{position:'absolute',top:Config.STATUSBARHEIGHT,height:50,width:width,alignItems:'flex-end',justifyContent:'center'}}>
                    <View style={{flexDirection:'row',marginRight:20}}>
                        <Button style={{marginRight:30}} transparent    onPress={()=> Actions.message({title:'消息'})}>
                            <Thumbnail  style={{width:20,height:20}} source={require('../img/newicon_warn.png')} />
                        </Button>
                        <Button transparent
                                onPress={()=> Actions.setting()}
                        >
                            <Thumbnail   style={{width:20,height:20}} source={require('../img/newicon_setting.png')} />
                        </Button>
                        {Config.IECEIVESOCKET==1?(
                                <View style={{position:'absolute',top:13,right:45,width:16,height:16,borderRadius:8,backgroundColor:'#f00',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:10,color:'#fff'}}>1</Text>
                                </View>):(null) }
                    </View>
                </View>
            </Container>
        );
    }

}