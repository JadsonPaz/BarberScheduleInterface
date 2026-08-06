import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 92,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE5DD',
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#201B17',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardReadOnly: {
    opacity: 1,
  },
  info: {
    flex: 1,
    gap: 8,
    paddingRight: 12,
  },
  clientName: {
    alignSelf: 'flex-start',
    color: '#2F6B5F',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '900',
    borderBottomWidth: 1,
    borderBottomColor: '#A8D8BD',
    paddingBottom: 1,
  },
  service: {
    color: '#201B17',
    fontSize: 17,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
  },
  meta: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '800',
  },
  dot: {
    color: '#B9B0A7',
    fontSize: 13,
    fontWeight: '900',
  },
  cancelButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#F3B8AA',
  },
  cancelIcon: {
    color: '#9E321F',
    fontSize: 24,
    fontWeight: '900',
  },
  statusActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  doneButton: {
    backgroundColor: '#EAF7F0',
    borderColor: '#A8D8BD',
  },
  cancelledButton: {
    backgroundColor: '#FFF0ED',
    borderColor: '#F3B8AA',
  },
  statusButtonDisabled: {
    opacity: 0.45,
  },
  statusIcon: {
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  doneIcon: {
    color: '#24734D',
  },
  cancelledIcon: {
    color: '#9E321F',
  },
});
