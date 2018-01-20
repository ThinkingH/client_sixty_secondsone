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
const icons=[require('./../img/nav_home_n.png'),require('./../img/nav_seach_n.png'),require('./../img/nav_fav_n.png'),require('./../img/nav_account_n.png')];
const icons_s=[require('./../img/nav_home_s.png'),require('./../img/nav_seach_s.png'),require('./../img/nav_fav_s.png'),require('./../img/nav_account_s.png')];

const name=["首页","搜索","收藏","我的"]
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    containera: { flex: 2, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

const TabIcon = (props) => (
    <View style={props.focused?styles.container:styles.containera}>
        <Image source={props.focused ?icons_s[props.icon_id]:icons[props.icon_id]}/>
        {/*<Text style={{ color: props.focused ? '#00FF00' : '#313131' }}>
        {props.title}
        </Text>*/}
        {/*{props.focused?(<Text>{name[props.icon_id]}</Text>):(null)}*/}
    </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
