import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFE7',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  brand: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    color: '#201B17',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 360,
  },
  form: {
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderWidth: 1,
    borderColor: '#E8E2DA',
    shadowColor: '#201B17',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  errorBox: {
    borderRadius: 12,
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#F3B8AA',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#9E321F',
    fontSize: 13,
    fontWeight: '700',
  },
  successBox: {
    borderRadius: 12,
    backgroundColor: '#EAF4F0',
    borderWidth: 1,
    borderColor: '#B9D8CF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  successText: {
    color: '#2F6B5F',
    fontSize: 13,
    fontWeight: '700',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingBottom: 14,
  },
  forgotText: {
    color: '#2F6B5F',
    fontSize: 13,
    fontWeight: '700',
  },
  switchRow: {
    minHeight: 42,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  switchText: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '700',
  },
  switchLink: {
    color: '#2F6B5F',
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryLink: {
    alignSelf: 'center',
    paddingTop: 2,
    paddingBottom: 8,
  },
  secondaryLinkText: {
    color: '#2F6B5F',
    fontSize: 13,
    fontWeight: '800',
  },
});
