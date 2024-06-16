import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = async language => {
    await AsyncStorage.setItem('user-language', language);
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    Alert.alert(t('settings.languageChanged', {lng: language}));
  };

  const RadioButton = ({label, selected, onPress}) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.radioSelected} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings.language')}</Text>
      <RadioButton
        label={t('languages.english')}
        selected={selectedLanguage === 'en'}
        onPress={() => changeLanguage('en')}
      />
      <RadioButton
        label={t('languages.hindi')}
        selected={selectedLanguage === 'hi'}
        onPress={() => changeLanguage('hi')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ff6347',
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
  },
});

export default Settings;
