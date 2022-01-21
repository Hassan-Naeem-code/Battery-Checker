import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  NativeModules,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [chargeState, setChargeState] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  useEffect(() => {
    DeviceInfo.getPowerState().then(state => {
      setBatteryLevel(state.batteryLevel * 100);
      console.log('batteryLevel', state.batteryLevel * 100);
    });
    DeviceInfo.isBatteryCharging().then(isCharging => {
      // true or false
      console.log('isCharging', isCharging);
      setChargeState(isCharging);
    });
    console.log('NativeModules', NativeModules);
  });
  const calculateEstimateTime = () => {
    let currentBatteryLevel = batteryLevel / 100;
    let requiredBatteryLevel = 1;
    let requiredTimeToFullCharge = 0;
    requiredTimeToFullCharge = Math.abs(
      parseFloat(requiredBatteryLevel - currentBatteryLevel * 100),
    );
    return (
      <Text
        style={[styles.subHeading, styles.fontWeightBold, {marginTop: '2%'}]}>
        {requiredTimeToFullCharge} Minutes
      </Text>
    );
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/chargingBackground.jpg')}
      resizeMode={'cover'}>
      <View style={styles.mainHeadingWrapper}>
        <Text style={styles.mainHeading}>EV - CHARGING PARAMETERS</Text>
      </View>
      <View style={styles.chargingWrapper}>
        <View style={[styles.center, styles.paddingVertical10]}>
          <Text style={styles.subHeading}>State Of Charge</Text>
          <Text
            style={[
              styles.subHeading,
              styles.fontWeightBold,
              {color: chargeState ? 'red' : 'green', marginTop: '2%'},
            ]}>
            {chargeState ? 'CONNECTED' : 'NOT CONNECTED'}
          </Text>
          {/* {chargeState ? (
            <Feather name={'battery-charging'} color={'red'} size={30} />
          ) : (
            <FontAwesome name={'battery'} color={'green'} size={30} />
          )} */}
        </View>
        <View style={styles.center}>
          <Text style={styles.subHeading}>Battery Percentage</Text>
          <View style={[styles.directionRow, styles.marginVertical10]}>
            <MaterialCommunityIcons
              name={'lightning-bolt'}
              color={chargeState ? 'red' : 'green'}
              size={30}
            />
            <Text style={[styles.subHeading, styles.fontWeightBold]}>
              {batteryLevel}
            </Text>
          </View>
        </View>
        {chargeState && (
          <View style={styles.center}>
            <Text style={styles.subHeading}>Time Required</Text>
            <View style={[styles.directionRow, styles.marginVertical10]}>
              <MaterialCommunityIcons
                name={'clock-time-five'}
                color={'white'}
                size={30}
              />
              {calculateEstimateTime()}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeadingWrapper: {
    position: 'absolute',
    top: '20%',
    right: '3%',
  },
  chargingWrapper: {
    position: 'absolute',
    top: '40%',
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 38,
    textAlign: 'center',
    fontWeight: '700',
  },
  subHeading: {
    fontSize: 17,
    color: '#fff',
  },
  directionRow: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  paddingVertical10: {
    paddingVertical: '8%',
  },
  fontWeightBold: {
    fontWeight: '900',
  },
});
