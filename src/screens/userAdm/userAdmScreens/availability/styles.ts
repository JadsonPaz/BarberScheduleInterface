import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EA',
    paddingHorizontal: 24,
    paddingTop: 64,
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
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  optionCard: {
    minHeight: 86,
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
  optionTextGroup: {
    flex: 1,
    paddingRight: 14,
  },
  optionTitle: {
    color: '#201B17',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  optionDescription: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  optionArrow: {
    color: '#2F6B5F',
    fontSize: 28,
    fontWeight: '900',
  },
});
