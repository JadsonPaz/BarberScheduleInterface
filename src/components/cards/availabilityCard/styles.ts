import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dayCard: {
    minHeight: 82,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9E6DD',
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCardInactive: {
    borderColor: '#ECE5DD',
    backgroundColor: '#FBF7F0',
  },
  dayMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  statusBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#B8AEA4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFFDF9',
  },
  statusBoxActive: {
    borderColor: '#2F6B5F',
    backgroundColor: '#2F6B5F',
  },
  statusMark: {
    color: '#FFFDF9',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 18,
  },
  dayTextGroup: {
    flex: 1,
  },
  dayName: {
    color: '#201B17',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 5,
  },
  dayTime: {
    color: '#2F6B5F',
    fontSize: 14,
    fontWeight: '800',
  },
  closedText: {
    color: '#8B8279',
  },
  toggleButton: {
    minWidth: 78,
    minHeight: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6DCD2',
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 10,
  },
  toggleButtonActive: {
    borderColor: '#CFE2D8',
    backgroundColor: '#EAF5EF',
  },
  toggleText: {
    color: '#8B8279',
    fontSize: 12,
    fontWeight: '900',
  },
  toggleTextActive: {
    color: '#2F6B5F',
  },
});
