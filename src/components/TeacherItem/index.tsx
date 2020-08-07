import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';

import styles from './styles';

export interface Teacher {
  id: number
  name: string
  avatar: string
  bio: string
  subject: string
  cost: number
  whatsapp: string
}

interface TeacherItemProps {
  teacher: Teacher
  isFavorite: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, isFavorite }) => {
  const [favoriteTeacher, setFavoriteTeacher] = useState(isFavorite);

  function handleContactLink() {
    api.post('connections', {
      user_id: teacher.id,
    })
    
    Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`)
  }

  async function toggleFavorite() {
    let favoritesArray = [];

    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) favoritesArray = JSON.parse(favorites);

    if (favoriteTeacher) {
      const favoriteIndex = favoritesArray.findIndex((favorite: Teacher) => {
        return favorite.id === teacher.id
      })
      favoritesArray.splice(favoriteIndex, 1)
      setFavoriteTeacher(false);
    } else {
      favoritesArray.push(teacher);
      setFavoriteTeacher(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{ uri: teacher.avatar }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={toggleFavorite }
            style={[
              styles.favoriteButton,
              favoriteTeacher ? styles.favorited : {},
            ]}
          >
            {favoriteTeacher
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton
            onPress={handleContactLink}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;