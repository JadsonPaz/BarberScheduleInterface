import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EA',
    paddingHorizontal: 20,
    paddingTop: 58,
  },
  title: {
    color: '#201B17',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 18,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 28,
    gap: 12,
  },
  errorText: {
    color: '#9E321F',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptyText: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 28,
  },
});
