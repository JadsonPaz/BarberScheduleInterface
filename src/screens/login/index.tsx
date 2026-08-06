import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthButton } from '../../components/auth/AuthButton';
import { AuthTextField } from '../../components/auth/AuthTextField';
import useAuthServices from '../../services/authService';
import type { LoginResult } from '../../types/auth';
import type { RootStackParamList } from '../../types/navigation';
import { isValidEmail, normalizeEmail } from '../../utils/validators';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

function getRequestErrorMessage(error: unknown): string {
  const response = (error as any)?.response?.data;
  return response?.body?.text ?? response?.body?.message ?? response?.message
    ?? 'Não foi possível concluir a solicitação.';
}

function getResetTokenFromUrl(url: string | null) {
  if (!url) return '';

  const tokenMatch = url.match(/[?&]token=([^&]+)/);
  return tokenMatch?.[1] ? decodeURIComponent(tokenMatch[1]) : '';
}

export default function LoginScreen({ navigation, route }: Props) {
  const {
    login,
    signup,
    forgotPassword,
    resetPassword,
    getAuth,
    authLoading,
  } = useAuthServices();

  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';
  const isLogin = mode === 'login';
  const routeToken = route.params?.token;
  const sessionMessage = route.params?.sessionMessage;

  const title = isSignup
    ? 'Criar conta'
    : isForgot
      ? 'Recuperar senha'
      : isReset
        ? 'Redefinir senha'
        : 'Entrar';
  const subtitle = isSignup
    ? 'Faça seu cadastro.'
    : isForgot
      ? 'Informe seu e-mail para receber o link de recuperação.'
      : isReset
        ? 'Informe o token recebido e sua nova senha.'
        : 'Acesse sua conta.';

  const submitTitle = authLoading
    ? isSignup
      ? 'Criando conta...'
      : isForgot
        ? 'Enviando...'
        : isReset
          ? 'Redefinindo...'
          : 'Entrando...'
    : isSignup
      ? 'Cadastrar'
      : isForgot
        ? 'Enviar instruções'
        : isReset
          ? 'Redefinir senha'
          : 'Entrar';

  useEffect(() => {
    let mounted = true;
    getAuth().then((stored) => {
      if (mounted && stored?.user?.role && !resetToken && !routeToken) {
        redirectByRole(stored);
      }
    });
    return () => { mounted = false; };
  }, [resetToken, routeToken]);

  useEffect(() => {
    if (sessionMessage) {
      switchMode('login');
      setError(sessionMessage);
    }
  }, [sessionMessage]);

  useEffect(() => {
    if (routeToken) {
      setResetToken(routeToken);
      switchMode('reset');
    }
  }, [routeToken]);

  useEffect(() => {
    function handleUrl(url: string | null) {
      const token = getResetTokenFromUrl(url);

      if (token) {
        setResetToken(token);
        switchMode('reset');
        navigation.navigate('Login', { token });
      }
    }

    Linking.getInitialURL().then(handleUrl);
    const subscription = Linking.addEventListener('url', ({ url }) => handleUrl(url));

    return () => subscription.remove();
  }, []);

  function redirectByRole(auth: LoginResult) {
    navigation.replace(auth.user.role === 'admin' ? 'AdminTabs' : 'UserTabs', auth);
  }

  function switchMode(next: AuthMode) {
    setMode(next);
    setError('');
    setSuccessMessage('');
  }

  function validateForm(): string {
    const normalizedEmail = normalizeEmail(email);

    if (isSignup && !name.trim()) return 'Informe seu nome.';
    if ((isLogin || isSignup || isForgot) && !isValidEmail(normalizedEmail)) {
      return 'Informe um e-mail válido.';
    }
    if ((isLogin || isSignup) && password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (isSignup && password !== confirmPassword) return 'As senhas não conferem.';
    if (isReset && !resetToken.trim()) return 'Informe o token de recuperação.';
    if (isReset && newPassword.length < 6) return 'A nova senha deve ter pelo menos 6 caracteres.';
    if (isReset && newPassword !== confirmNewPassword) return 'As senhas não conferem.';

    return '';
  }

  async function handleSubmit() {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setError('');
    setSuccessMessage('');

    try {
      if (isForgot) {
        const response = await forgotPassword(normalizeEmail(email));
        setSuccessMessage(response?.text ?? 'Se o e-mail estiver cadastrado, você receberá as instruções.');
        return;
      }

      if (isReset) {
        const response = await resetPassword({
          token: resetToken.trim(),
          newPassword,
        });
        setSuccessMessage(response?.text ?? 'Senha redefinida com sucesso. Faça login com a nova senha.');
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMode('login');
        return;
      }

      const normalizedEmail = normalizeEmail(email);
      const auth = isSignup
        ? await signup({ fullname: name.trim(), name: name.trim(), email: normalizedEmail, password })
        : await login({ email: normalizedEmail, password });

      if (auth?.user?.role) return redirectByRole(auth);
      setError('Resposta de autenticação inválida.');
    } catch (err) {
      setError(getRequestErrorMessage(err));
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.brand}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.form}>
            {Boolean(error) && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {Boolean(successMessage) && (
              <View style={styles.successBox}>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            )}

            {isSignup && (
              <AuthTextField
                label="Nome"
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            )}

            {(isLogin || isSignup || isForgot) && (
              <AuthTextField
                label="E-mail"
                placeholder="voce@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
              />
            )}

            {(isLogin || isSignup) && (
              <AuthTextField
                label="Senha"
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={passwordHidden}
                icon={
                  <Ionicons
                    name={passwordHidden ? 'eye-off' : 'eye'}
                    size={22}
                    color="#9B948C"
                  />
                }
                onIconPress={() => setPasswordHidden((prev) => !prev)}
                textContentType={isSignup ? 'newPassword' : 'password'}
                returnKeyType={isSignup ? 'next' : 'done'}
              />
            )}

            {isSignup && (
              <AuthTextField
                label="Confirmar senha"
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="done"
              />
            )}

            {isReset && (
              <>
                <AuthTextField
                  label="Token"
                  placeholder="Token recebido no e-mail"
                  value={resetToken}
                  onChangeText={setResetToken}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                <AuthTextField
                  label="Nova senha"
                  placeholder="Nova senha"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="next"
                />
                <AuthTextField
                  label="Confirmar nova senha"
                  placeholder="Repita a nova senha"
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="done"
                />
              </>
            )}

            {isLogin && (
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.forgotButton}
                onPress={() => switchMode('forgot')}
              >
                <Text style={styles.forgotText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            )}

            <AuthButton title={submitTitle} loading={authLoading} onPress={handleSubmit} />

            <View style={styles.switchRow}>
              {isLogin && (
                <>
                  <Text style={styles.switchText}>Não tem conta?</Text>
                  <TouchableOpacity onPress={() => switchMode('signup')} activeOpacity={0.85}>
                    <Text style={styles.switchLink}> Cadastre-se</Text>
                  </TouchableOpacity>
                </>
              )}

              {isSignup && (
                <>
                  <Text style={styles.switchText}>Já tem uma conta?</Text>
                  <TouchableOpacity onPress={() => switchMode('login')} activeOpacity={0.85}>
                    <Text style={styles.switchLink}> Faça login</Text>
                  </TouchableOpacity>
                </>
              )}

              {(isForgot || isReset) && (
                <>
                  <Text style={styles.switchText}>Lembrou a senha?</Text>
                  <TouchableOpacity onPress={() => switchMode('login')} activeOpacity={0.85}>
                    <Text style={styles.switchLink}> Faça login</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {isForgot && (
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.secondaryLink}
                onPress={() => switchMode('reset')}
              >
                <Text style={styles.secondaryLinkText}>Já tenho um token</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
