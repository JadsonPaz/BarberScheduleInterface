import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    minHeight: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE5DD',
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
    paddingRight: 14,
  },
  title: {
    color: '#201B17',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  details: {
    color: '#2F6B5F',
    fontSize: 14,
    fontWeight: '900',
  },
  description: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginTop: 6,
  },
  arrow: {
    color: '#2F6B5F',
    fontSize: 28,
    fontWeight: '900',
  },
});
