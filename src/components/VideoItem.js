/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions,DeviceEventEmitter,Text } from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
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
let isfromcollect=false;
export default class VideoItem extends React.PureComponent  {

    _goDetails=()=>{
        if(this.props.thetype=='1022'){
            isfromcollect=true;
            Actions.videodetails({title:this.props.title.biaoti,nowid:this.props.title.vid,isfromcollect:isfromcollect})
        }else{
            isfromcollect=false;
            Actions.videodetails({title:this.props.title.biaoti,nowid:this.props.title.vid,isfromcollect:isfromcollect})
        }
    };

    render() {


        return (
        this.props.title=="1"?(
            <View style={{width:width/2,backgroundColor:'#fafafa'}}>

            </View>
            ):(
                <Card   style={{borderRadius:2,marginLeft:4.5,marginRight:4.5}} >
                    <CardItem
                        onPress={()=>{ DeviceEventEmitter.emit("zanting","让视频暂停");
                        if(this.props.sign){
                            Actions.dietarycontribute({title:this.props.title.biaoti,nowid:this.props.title.vid,isfromcollect:isfromcollect})
                        }else{
                          this._goDetails();
                        }


                        }} button={true}  cardBody>
                        <View style={{backgroundColor:'#ccc'}}>
                            <Image source={{uri:this.props.title.showimg}} style={{height: width/2-10, width: width/2-10, flex: 1,borderTopLeftRadius:2,borderTopRightRadius:2}}/>

                        </View>

                    </CardItem>
                    <Text numberOfLines={2} style={{height:40, letterSpacing:5,lineHeight:20,margin:15,fontSize:14,color:'#000'}} >{this.props.title.biaoti}</Text>
                    {/*<CardItem style={{height:60,justifyContent:"flex-start"}} >*/}
                        {/*<Text numberOfLines={2} style={{textAlignVertical:'top',lineHeight:20,flex:1,backgroundColor:'#f00'}} >{this.props.title.biaoti}</Text>*/}
                    {/*</CardItem>*/}
                </Card>
            )

        )
    }
}