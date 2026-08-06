import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EA',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 34,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: '#201B17',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  progress: {
    color: '#2F6B5F',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 4,
  },
  stepLabel: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '800',
  },
  summaryBar: {
    borderRadius: 8,
    backgroundColor: '#201B17',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    gap: 4,
  },
  summaryText: {
    color: '#FFF8EF',
    fontSize: 13,
    fontWeight: '800',
  },
  errorBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3B8AA',
    backgroundColor: '#FFF0ED',
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    color: '#9E321F',
    fontSize: 13,
    fontWeight: '800',
  },
  backButton: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2ECE4',
    marginTop: 16,
  },
  backButtonText: {
    color: '#201B17',
    fontSize: 14,
    fontWeight: '900',
  },
});
