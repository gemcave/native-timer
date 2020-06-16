import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions } from 'react-native';


const screen = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#07121B',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: "white",
		fontSize: 45,
		color: "#89AAFF"
	},
	button: {
		borderWidth: 10,
		borderColor: "#89AAFF",
		width: screen.width / 2,
		height: screen.width / 2,
		borderRadius: screen.width / 2,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30
	},
	buttonStop: {
		borderColor: "#FF851B"
	},	
	buttonTextStop: {
		color: "#FF851B"
	},	
	timerText: {
		fontSize: 90,
		color: '#fff'
	}
});
const formatNumber = (number) => `0${number}`.slice(-2)

const getRamainig = (time) => {
	const minutes = Math.floor(time / 60)
	const seconds = time - minutes * 60

	return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}


export default function App() {
	const [remainingSeconds,setRemainingSeconds] = useState(10)
	const [isRunning,setIsRunning] = useState(false)
	const { minutes, seconds } = getRamainig(remainingSeconds)
	const intervalRef = useRef(null);
	
	const start = () => {
		if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
			setIsRunning(true)
      setRemainingSeconds((remainingSeconds) => {
        if (remainingSeconds >= 1) return remainingSeconds - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
	}

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
		setRemainingSeconds(5);
		setIsRunning(false)
  }

	const stop = () => {
		if (intervalRef.current === null) return;
		clearInterval(intervalRef.current);
		intervalRef.current = null
		setRemainingSeconds(15)
		setIsRunning(false)
	}
	

  return (
    <View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
			{!isRunning && (
				<TouchableOpacity onPress={() => start()} style={styles.button}>	
					<Text style={styles.buttonText}>Start</Text>
				</TouchableOpacity>)
			}
			{isRunning && (
				<TouchableOpacity onPress={() => stop()} style={[styles.button, styles.buttonStop]}>	
					<Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
				</TouchableOpacity>
			)}
    </View>
  );
}

