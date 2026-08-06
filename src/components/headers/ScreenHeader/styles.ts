import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#ECE5DD',
  },
  title: {
    flex: 1,
    color: '#201B17',
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
