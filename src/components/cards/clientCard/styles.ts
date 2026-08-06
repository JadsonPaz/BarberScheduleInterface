import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    minHeight: 86,
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#ECE5DD',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201B17',
    overflow: 'hidden',
    marginRight: 14,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    color: '#FFF8EF',
    fontSize: 18,
    fontWeight: '900',
  },
  textGroup: {
    flex: 1,
  },
  name: {
    color: '#201B17',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  email: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
  },
  count: {
    color: '#2F6B5F',
    fontSize: 13,
    fontWeight: '900',
  },
});
