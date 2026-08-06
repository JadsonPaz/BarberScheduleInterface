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
  content: {
    gap: 14,
    paddingBottom: 28,
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
    minHeight: 90,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6DCD2',
    backgroundColor: '#FFFDF9',
  },
  backButtonText: {
    color: '#756D65',
    fontSize: 14,
    fontWeight: '900',
  },
  saveButton: {
    flex: 1,
    minHeight: 50,
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
});
