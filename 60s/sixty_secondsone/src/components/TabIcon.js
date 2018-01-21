import React, {
  PropTypes,
} from 'react';
import {
  Text, Image, View,StyleSheet
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};
const icons=[require('./../img/nav_home_n.png'),require('./../img/nav_tips_n.png'),require('./../img/nav_seach_n.png'),require('./../img/nav_fav_n.png'),require('./../img/nav_account_n.png')];
const icons_s=[require('./../img/nav_home_s.png'),require('./../img/nav_tips_s.png'),require('./../img/nav_seach_s.png'),require('./../img/nav_fav_s.png'),require('./../img/nav_account_s.png')];

const name=["60Sec",'小窍门',"搜索","收藏","我的"]
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

const TabIcon = (props) => (
    <View style={styles.container}>
        <Image style={{width:20,height:20,marginBottom:5}} source={props.focused ?icons_s[props.icon_id]:icons[props.icon_id]}/>

        {props.focused?(<Text style={{color:'#F5C61E',fontSize:10}}>{name[props.icon_id]}</Text>):(<Text style={{fontSize:10}}>{name[props.icon_id]}</Text>)}
    </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
