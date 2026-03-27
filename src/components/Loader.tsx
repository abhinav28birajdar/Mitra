import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const { height } = Dimensions.get('window');

interface LoaderProps {
  visible?: boolean;
  overlay?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ visible = true, overlay = false }) => {
  if (!visible) return null;

  if (overlay) {
    return (
      <Modal transparent visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>
      </Modal>
    );
  }

  // Act as Full-Screen Splash when overlay is false (Default for app initialization)
  return (
    <View style={styles.splashContainer}>
      
      {/* Absolute top/left decorations (optional to match logo style) */}
      <View style={styles.splashCenter}>
        
        {/* Dynamic Icon / Replace M with Icon.png */}
        <View style={styles.iconBox}>
          {/* Using actual assets/icon.png instead of text 'M' mapping to user request on 'Image 3' UI constraints */}
           <Image 
             source={require('../../assets/images/icon.png')} 
             style={styles.logoImage} 
             resizeMode="contain" 
           />
        </View>

        <Text style={styles.splashTitle}>Mitra</Text>
        <Text style={styles.splashSubtitle}>Your AI Career Companion</Text>
      </View>

      {/* Footer Branding */}
      <View style={styles.splashFooter}>
        <Text style={styles.poweredText}>Powered by Gemini AI</Text>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary, // #5C5EE1
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashCenter: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  splashTitle: {
    ...typography.h1,
    fontSize: 42,
    color: colors.white,
    letterSpacing: 1,
    marginBottom: 8,
  },
  splashSubtitle: {
    ...typography.body,
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  splashFooter: {
    position: 'absolute',
    bottom: height * 0.08,
    alignItems: 'center',
  },
  poweredText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  // Overlay Styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
