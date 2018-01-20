

import React, {Component} from 'react';
import {
    View,
    Platform,
    StyleSheet,
    TouchableHighlight,
    Image,
    Alert,
    UIManager,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    WebView,
    TextInput,
    Dimensions,
    Animated,
    Modal,
    ScrollView,
    InteractionManager,
    DeviceEventEmitter,
    LayoutAnimation,
    ListView
} from "react-native";
import { Container, Header, Content,Button,Text,Thumbnail,Input,SwipeRow,List,Icon,ListItem} from 'native-base';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Config from "../utils/Config";
import Toast from '@remobile/react-native-toast'

import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
import Storage  from '../utils/Storage';
const {width, height} = Dimensions.get('window');
let _MaterValue=[{mvalue:'',cvalue:''},{mvalue:'',cvalue:''},{mvalue:'',cvalue:''}];
let _value='';
let a=new Array();
export default  class InputMaterials extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            num:0,
            value:'',
            views:[],
            examplenum:3,
            MaterValue:_MaterValue,
            aaaaa:'aaaaa',
            isshowdelete:false,
            basic: true,
            listViewData: this.props.materdata?this.props.materdata:[{mvalue:'鸡蛋',cvalue:'1个',id:0,rmvalue:'',rcvalue:''},
                {mvalue:'猪肉',cvalue:'100g',id:1,rmvalue:'',rcvalue:''},
                {mvalue:'色拉油',cvalue:'少许',id:2,rmvalue:'',rcvalue:''}],
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    deleteRow( rowId) {
        this.setState({
            isshowdelete:false
        });
       // rowMap[`${secId}${rowId}`].props.closeRow();
        console.log('1111111111',rowId)
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        _MaterValue.splice(rowId, 1);

        this.setState({ listViewData: newData },()=>{

            console.log('33333333333',_MaterValue)
            console.log('222222222222',this.state.listViewData)
        });


    }

    componentWillMount() {

    }

    componentWillUnmount() {
       let str= JSON.stringify(this.state.listViewData);
        Storage.saveWithKeyValue("matervalue",str);
        Storage.saveWithKeyValue("several",_value);
        this.props.callbackmater({materdata:this.state.listViewData,several:_value});

    }

    componentDidMount() {

    }

    _getMaterValue=(value,i)=>{
        console.log('mmmmmmmmmm',i)
        this.state.listViewData[i].rmvalue=value
        let c=new Array();
        c=this.state.listViewData;
        this.setState({
            listViewData:c
        });

        _MaterValue[i].mvalue=value;
        console.log(' this.state.listViewData', this.state.listViewData)
    };

    _getCountValue=(value,i)=>{
        console.log('ccccccccccccccc',i)
        this.state.listViewData[i].rcvalue=value

        let d=new Array();
        d=this.state.listViewData;
        this.setState({
            listViewData:d
        });
        _MaterValue[i].cvalue=value;
        console.log(' this.state.listViewData', this.state.listViewData)
    };

    getValue=(value)=>{
        _value=value;
        this.setState({
            value:value
        })
    }

    _renderTextInput=()=>{
        return(
            <View style={{width:width,height:40,backgroundColor:'#fff'}}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#bbbbbb'}
                    style={[styles.textInputStyle]}
                    placeholder={"2人份"}
                    maxLength={10}
                    value={this.state.value}
                    onChangeText={(value)=>{this.getValue(value)}}
                />
            </View>
        )
    };

    _renderHandler=()=>{
        return(
            <View style={{width:width,height:40,flexDirection:'row',alignItems:'center',marginBottom:40}}>
                <TouchableOpacity style={{width:30,height:40,marginLeft:15,justifyContent:'center'}} activeOpacity={0.9}
                                  onPress={()=>{this.setState({isshowdelete:!this.state.isshowdelete})}}>
                    <Text style={{fontSize:14,color:'#C5B361'}}>{this.state.isshowdelete?'取消':'删除'}</Text>
                </TouchableOpacity>

                <View style={{flex:1}}></View>
                <TouchableOpacity style={{width:30,height:40,marginRight:15,alignItems:'flex-end',justifyContent:'center'}} activeOpacity={0.9}
                                  onPress={()=>{this._addView()}}>
                    <Text style={{fontSize:14,color:'#C5B361'}}>添加</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _addView=()=>{
        if(this.state.listViewData.length>5){
            this.ScrollView.scrollTo({ y: 40*(this.state.listViewData.length-5), animated: true});
        }

        _MaterValue.push({mvalue:'',cvalue:''});

        console.log(_MaterValue)

        a=this.state.listViewData;

        a.push({mvalue:'食材',cvalue:'分量',id:this.state.listViewData.length,rmvalue:'',rcvalue:''});
        this.setState({
            listViewData:a
        },()=>{
            console.log('viewviewviewview:',this.state.views);
            console.log('_MaterValue_MaterValue_MaterValue:',_MaterValue);
            console.log('listViewDatalistViewDatalistViewData:',this.state.listViewData);
        })
    };

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    _renderItem=(data)=>{
        return(
            <ListItem style={{width:width,height:40}}>
                {this.state.isshowdelete?(
                        <TouchableOpacity  onPress={()=> this.deleteRow(data.id)} style={{width:40,height:40,backgroundColor:'#c5b361',alignItems:'center',justifyContent:'center'}}>
                            <Thumbnail square  style={{width:20,height:20}} source={require('../img/icon_close.png')} />
                        </TouchableOpacity>
                    ):(null)}
                <View style={{width:width,height:41}} >
                    <TouchableOpacity activeOpacity={1}  style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'#bbbbbb'}
                            style={[styles.textInputStyle]}
                            placeholder={data.mvalue}
                            maxLength={10}
                            value={data.rmvalue}
                            onChangeText={(value)=>{this._getMaterValue(value,data.id)}}
                        />
                        <View style={{width:1,height:40,backgroundColor:'#ccc'}}></View>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'#bbbbbb'}
                            style={[styles.textInputStyle,{flex:1}]}
                            placeholder={data.cvalue}
                            maxLength={10}
                             value={data.rcvalue}
                            onChangeText={(value)=>{this._getCountValue(value,data.id)}}
                        />
                    </TouchableOpacity>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                </View>
            </ListItem>
            )
    };

    render() {
        return (
            <Container style={{backgroundColor:'#f8f8f8'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor:'#f8f8f8'}} ref={(ScrollView)=>this.ScrollView=ScrollView}  keyboardShouldPersistTaps="handled"  >
                    {this._renderTextInput()}
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
                    </View>
                    <View style={{width:width,height:10,backgroundColor:'#f8f8f8'}}>
                    </View>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
                    </View>

                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data => this._renderItem(data)
                        }
                        renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full style={{backgroundColor:'#C5B361'}} onPress={(rowId)=> this.deleteRow(rowId)}>
                <Icon active name="trash" />
              </Button>}
                        disableRightSwipe
                        disableLeftSwipe
                        rightOpenValue={-75}
                    />
                    {this._renderHandler()}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#f1f1f2',
    },
    backgroundVideo: {
        width:width,
        height:height/2.5,
        marginBottom:100,
    },
    textInputStyle: {
        flex:2,
        textAlignVertical:'center',
        marginLeft:15,
        marginRight:15,
        padding:0,
        backgroundColor:'#fff',


    },
    uploadtext: {
        color:"#555",
        fontSize:14,
        marginLeft:15,
        marginTop:10
    }
});
//.setState({num:Number.parseInt(this.state.num)-1});
// _renderMater=(i)=>{
//     return(
//
//
//
//         <SwipeRow style={{height:41,backgroundColor:'#c5b361',margin:0}}
//                   disableRightSwipe
//
//                   rightOpenValue={-40}
//
//                   body={
//               <View style={{width:width,height:41}}  key={i}>
//             <TouchableOpacity activeOpacity={1} onPress={()=>alert('删除这一条'+i)} style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>
//
//
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle]}
//                     placeholder={"食材"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getMaterValue(value,i)}}
//                 />
//                <View style={{width:1,height:40,backgroundColor:'#ccc'}}></View>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle,{flex:1}]}
//                     placeholder={"分量"}
//                     maxLength={10}
//                    // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getCountValue(value,i)}}
//                 />
//
//             </TouchableOpacity>
//             <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
//             </View>
//             }
//                   right={
//               <Button style={{width:40,height:40,backgroundColor:'#c5b361'}}  onPress={() =>this._deleteMater(i)}>
//                 <Thumbnail square  style={{width:20,height:20}} source={require('../img/icon_close.png')} />
//               </Button>
//             }
//         />
//
//
//
//     )
// };
//
// _materExample=()=>{
//     return(
//         <View>
//             <View style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle]}
//                     placeholder={"鸡蛋"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getMaterValue(value,0)}}
//                 />
//                 <View style={{width:1,height:40,backgroundColor:'#ccc'}}>
//
//                 </View>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle,{flex:1}]}
//                     placeholder={"3个"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getCountValue(value,0)}}
//                 />
//
//             </View>
//             <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
//
//             </View>
//
//             <View style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle]}
//                     placeholder={"猪肉"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getMaterValue(value,1)}}
//                 />
//                 <View style={{width:1,height:40,backgroundColor:'#ccc'}}>
//
//                 </View>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle,{flex:1}]}
//                     placeholder={"100g"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getCountValue(value,1)}}
//                 />
//
//             </View>
//             <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
//
//             </View>
//
//             <View style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle]}
//                     placeholder={"色拉油"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getMaterValue(value,2)}}
//                 />
//                 <View style={{width:1,height:40,backgroundColor:'#ccc'}}>
//
//                 </View>
//                 <TextInput
//                     underlineColorAndroid='transparent'
//                     placeholderTextColor={'#bbbbbb'}
//                     style={[styles.textInputStyle,{flex:1}]}
//                     placeholder={"少许"}
//                     maxLength={10}
//                     // value={this.state.value+i}
//                     onChangeText={(value)=>{this._getCountValue(value,2)}}
//                 />
//
//             </View>
//             <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
//
//             </View>
//         </View>
//     )
// }