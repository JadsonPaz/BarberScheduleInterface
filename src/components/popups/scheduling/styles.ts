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
    maxWidth: 430,
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    padding: 20,
  },
  title: {
    color: '#201B17',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: '#756D65',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    color: '#201B17',
    fontSize: 15,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2ECE4',
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B5F',
  },
  secondaryText: {
    color: '#201B17',
    fontSize: 14,
    fontWeight: '900',
  },
  primaryText: {
    color: '#FFF8EF',
    fontSize: 14,
    fontWeight: '900',
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successText: {
    color: '#2F6B5F',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 23,
  },
});
