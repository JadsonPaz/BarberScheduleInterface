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
    maxWidth: 360,
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    padding: 20,
  },
  title: {
    color: '#201B17',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  message: {
    color: '#756D65',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    minHeight: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#EAF4F0',
  },
  confirmButton: {
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#F3B8AA',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '900',
  },
  cancelText: {
    color: '#2F6B5F',
  },
  confirmText: {
    color: '#9E321F',
  },
});
