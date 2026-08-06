import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  selectorCard: {
    width: '100%',
    minHeight: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE5DD',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  selectorTextGroup: {
    flex: 1,
    minWidth: 0,
  },
  selectorLabel: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 5,
  },
  selectorDate: {
    color: '#201B17',
    fontSize: 18,
    fontWeight: '900',
  },
  selectorIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF4EF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(32, 27, 23, 0.42)',
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 22,
  },
  modalCard: {
    borderRadius: 22,
    backgroundColor: '#FFFDF9',
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  modalTitle: {
    color: '#201B17',
    fontSize: 20,
    fontWeight: '900',
  },
  modalSubtitle: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4EFE7',
  },
  monthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4EFE7',
  },
  monthTitle: {
    flex: 1,
    color: '#201B17',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    width: `${100 / 7}%`,
    color: '#756D65',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellEmpty: {
    opacity: 0,
  },
  dayCellToday: {
    borderRadius: 12,
    backgroundColor: '#EEF4EF',
  },
  dayCellSelected: {
    borderRadius: 12,
    backgroundColor: '#2F6B5F',
  },
  dayText: {
    color: '#201B17',
    fontSize: 15,
    fontWeight: '900',
  },
  dayTextSelected: {
    color: '#FFF8EF',
  },
});


