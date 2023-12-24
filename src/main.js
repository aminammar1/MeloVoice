import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as Speech from 'expo-speech';

const Main = () => {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [showImage, setShowImage] = React.useState(true);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        
        // Speak "Start recording" when recording starts
        speakText('Start recording');

        // Animate and transform the image when recording starts
        imageRef?.swing(800);
        
        // Hide the image
        setShowImage(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    
    // Show the image when recording stops
    setShowImage(true);
    
    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
      saved: false,
    });
    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <View style={styles.circularContainer}>
            <Image
              style={styles.circularImage}
              source={require('../assets/app.png')}
            />
          </View>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <TouchableOpacity
            onPress={() => recordingLine.sound.replayAsync()}
            onPressIn={() => saveRecording(index)}
            style={[
              styles.playButton,
              { backgroundColor: recordingLine.saved ? 'black' : 'grey' },
            ]}
          >
            <Ionicons
              name="ios-play"
              size={24}
              color={recordingLine.saved ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([]);
  }

  function saveRecording(index) {
    let allRecordings = [...recordings];
    allRecordings[index].saved = true;
    setRecordings(allRecordings);
  }

  function speakText(text) {
    Speech.speak(text, {
      language: 'en',
      rate: 1.0,
    });
  }

  function stopSpeech() {
    Speech.stop();
  }

  let imageRef;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        onLongPress={() => speakText('Recording')}
        onPressOut={stopSpeech}
        style={[styles.recordButton, { alignItems: 'center' }]}
      >
        {recording ? (
          <View>
            <Text style={styles.recordText}>Recording...</Text>
            <Ionicons name="ios-stop" size={96} color="black" />
          </View>
        ) : (
          <Animatable.View
            ref={(ref) => (imageRef = ref)}
            style={{
              width: 150,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {showImage && (
              <Animatable.Image
                style={{ width: '100%', height: '100%', borderRadius: 75 }}
                source={require('../assets/app.png')}
                animation="rotate"
              />
            )}
            <Text style={styles.startRecordText}>Start Record</Text>
          </Animatable.View>
        )}
      </TouchableOpacity>
      {recordings.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearRecordings}>
          <Text style={styles.clearButtonText}>Clear Recordings</Text>
        </TouchableOpacity>
      )}
      {getRecordingLines()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40,
    marginBottom: 10,
  },
  fill: {
    flex: 1,
    margin: 15,
    color: 'white',
  },
  circularContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    margin: 10,
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  recordButton: {
    marginBottom: 20,
  },
  recordText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  startRecordText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});

export default Main;
