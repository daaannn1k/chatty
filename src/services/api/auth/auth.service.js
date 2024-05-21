import axios from '@services/axios';
class AuthService {
  async signUp(body) {
    const response = await axios.post('/signup', body);
    return response;
  }

  async signIn(body) {
    const response = await axios.post('/signin', body);
    return response;
  }

  async forgotPassword(email) {
    const response = await axios.post('/forgot-password', { email });
    return response;
  }

  async resetPassword(body, token) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }

  async signOut() {
    const response = await axios.get('/signout');
    return response;
  }

  async checkCurrentUser() {
    const response = await axios.get('/currentuser');
    return response;
  }
}

export const authService = new AuthService();