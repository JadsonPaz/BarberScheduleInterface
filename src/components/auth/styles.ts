import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  field: {
    gap: 8,
    marginBottom: 16,
  },
  label: {
    color: '#403A34',
    fontSize: 13,
    fontWeight: '700',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DED7CF',
    backgroundColor: '#FFFDF9',
    color: '#201B17',
    fontSize: 15,
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -11 }],
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minHeight: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B5F',
    marginTop: 4,
    shadowColor: '#2F6B5F',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#FFF8EF',
    fontSize: 15,
    fontWeight: '800',
  },
});
