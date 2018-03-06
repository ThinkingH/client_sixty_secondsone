import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  }

    callback = (map)=>{
        if(Platform.OS == 'ios'){
            const {account,resetTo} = this.props;
            JPushModule.setBadge(0, success => {
                console.log(success)
            });
            switch (map.push_type){
                case 'chat':
                    if(account.logged){
                        resetTo({name: 'chat', passProps: {
                                msg:`friend__${map.id*account.uid}`,
                                type: 'friend',
                                member_name: map.info.username,
                                remarkname:map.info.remark_name,
                                uid:map.id,
                                msgId:map.id*account.uid,
                                member_avatar:map.info.avatar
                            }});
                    }else{
                        launch_info(true)
                    }
                    break;
                case 'local' :
                    switch (map.event) {
                        case 'url':
                            Linking.openURL(map.url).catch(err => console.error('An error occurred', err));
                            break;

                    }
                    break;
                case 'url':
                    Linking.openURL(map.url).catch(err => console.error('An error occurred', err));
                    break;
            }

        }else{
            const {account,resetTo} = this.props;
            console.log('Opening notification!');
            const notice_info = JSON.parse(map.extras);
            switch (notice_info.push_type){
                case 'chat':
                    if(account.logged){
                        resetTo({name: 'chat', passProps: {
                                msg:`friend__${notice_info.id*account.uid}`,
                                type: 'friend',
                                member_name: notice_info.info.username,
                                remarkname:notice_info.info.remark_name,
                                uid:notice_info.id,
                                msgId:notice_info.id*account.uid,
                                member_avatar:notice_info.info.avatar
                            }});
                    }else{
                        launch_info(true)
                    }
                    break;
                case 'local' :
                    switch (notice_info.event) {
                        case 'url':
                            Linking.openURL(notice_info.url).catch(err => console.error('An error occurred', err));
                            break;
                    }
                    break;
                case 'url':
                    Linking.openURL(notice_info.url).catch(err => console.error('An error occurred', err));
                    break;
            }
        }

    };


  render() {
    return (
      <Animated.View style={[styles.container, { backgroundColor: 'rgba(52,52,52,0.5)' },
      { transform: [{ translateY: this.state.offset }] }]}>
        <View style={{
          width: 250,
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <Text>{this.props.data}</Text>
          <Button onPress={this.closeModal.bind(this)}>Close</Button>
        </View>
      </Animated.View>
    );
  }
}
