import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EA',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 28,
  },
  title: {
    color: '#201B17',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 20,
  },
  feedbackBox: {
    minHeight: 118,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECE5DD',
    backgroundColor: '#FFFDF9',
    padding: 18,
  },
  feedbackText: {
    color: '#756D65',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
