import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 20, 17, 0.42)',
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    padding: 18,
  },
  title: {
    color: '#201B17',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  subtitle: {
    color: '#756D65',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 16,
  },
  label: {
    color: '#403A34',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DED7CF',
    backgroundColor: '#FFFFFF',
    color: '#201B17',
    fontSize: 15,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  descriptionInput: {
    minHeight: 82,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  deleteButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3B8AA',
    backgroundColor: '#FFF0ED',
  },
  deleteButtonText: {
    color: '#9E321F',
    fontSize: 14,
    fontWeight: '900',
  },
  saveButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B5F',
  },
  saveButtonText: {
    color: '#FFF8EF',
    fontSize: 14,
    fontWeight: '900',
  },
  closeButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '900',
  },
});
