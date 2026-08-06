import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(32, 27, 23, 0.48)',
    padding: 24,
  },
  popup: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    padding: 20,
  },
  title: {
    color: '#201B17',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 18,
  },
  detailGroup: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  rowItem: {
    flex: 1,
  },
  label: {
    color: '#756D65',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: '#201B17',
    fontSize: 15,
    fontWeight: '800',
  },
  closeButton: {
    minHeight: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B5F',
    marginTop: 6,
  },
  closeText: {
    color: '#FFF8EF',
    fontSize: 14,
    fontWeight: '900',
  },
});
