import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#ECE5DD',
    padding: 18,
  },
  title: {
    color: '#201B17',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  option: {
    minHeight: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DED7CF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  barberOption: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201B17',
    overflow: 'hidden',
  },
  barberAvatarImage: {
    width: '100%',
    height: '100%',
  },
  barberAvatarText: {
    color: '#FFF8EF',
    fontSize: 16,
    fontWeight: '900',
  },
  optionTitle: {
    color: '#201B17',
    fontSize: 15,
    fontWeight: '900',
  },
  optionSubtitle: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    minWidth: 86,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF4F0',
    borderWidth: 1,
    borderColor: '#B9D8CF',
  },
  timeText: {
    color: '#2F6B5F',
    fontSize: 14,
    fontWeight: '900',
  },
  feedback: {
    minHeight: 84,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F2EA',
    padding: 16,
  },
  feedbackText: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  calendarTitle: {
    color: '#201B17',
    fontSize: 16,
    fontWeight: '900',
  },
  monthButton: {
    minWidth: 42,
    minHeight: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2ECE4',
  },
  monthButtonDisabled: {
    opacity: 0.35,
  },
  monthButtonText: {
    color: '#201B17',
    fontSize: 20,
    fontWeight: '900',
  },
  calendarGrid: {
    width: '100%',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekLabel: {
    flex: 1,
    color: '#756D65',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 3,
  },
  dayButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF4F0',
  },
  dayButtonDisabled: {
    backgroundColor: '#F2ECE4',
    opacity: 0.45,
  },
  dayText: {
    color: '#2F6B5F',
    fontSize: 14,
    fontWeight: '900',
  },
  dayTextDisabled: {
    color: '#9B948C',
  },
});

