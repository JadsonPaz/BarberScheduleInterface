import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EA',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 28,
  },
  title: {
    color: '#201B17',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 20,
  },
  section: {
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#ECE5DD',
    padding: 16,
    marginBottom: 14,
  },
  cards: {
    gap: 12,
  },
  sectionTitle: {
    color: '#201B17',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 14,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201B17',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    color: '#FFF8EF',
    fontSize: 26,
    fontWeight: '900',
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(32, 27, 23, 0.52)',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2ECE4',
    paddingHorizontal: 12,
  },
  secondaryButtonText: {
    color: '#201B17',
    fontSize: 14,
    fontWeight: '900',
  },
  errorBox: {
    borderRadius: 8,
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#F3B8AA',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  errorText: {
    color: '#9E321F',
    fontSize: 13,
    fontWeight: '800',
  },
  successBox: {
    borderRadius: 8,
    backgroundColor: '#EAF4F0',
    borderWidth: 1,
    borderColor: '#B9D8CF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  successText: {
    color: '#2F6B5F',
    fontSize: 13,
    fontWeight: '800',
  },
});
