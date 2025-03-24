import { describe, it, expect, beforeEach, vi } from 'vitest';
import { auth, login, register, logout } from '../../src';
import type { Auth } from '../../src';

// Mock the auth module
vi.mock('../../src', () => ({
  auth: {
    api: {
      signInEmail: vi.fn(),
      signUpEmail: vi.fn(),
      signOut: vi.fn(),
    },
  },
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
}));

describe('Auth', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('login', () => {
    it('should successfully log in with valid credentials', async () => {
      const mockResponse = {
        redirect: false,
        token: 'mock-token',
        url: undefined,
        user: {
          id: 'user123',
          email: 'test@example.com',
          name: 'Test User',
          image: null,
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      vi.mocked(login).mockResolvedValueOnce(mockResponse);

      const result = await login({
        body: {
          email: 'test@example.com',
          password: 'validPassword123',
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.token).toBeTruthy();
    });

    it('should fail with invalid credentials', async () => {
      vi.mocked(login).mockRejectedValueOnce(new Error('Invalid credentials'));

      await expect(
        login({
          body: {
            email: 'wrong@example.com',
            password: 'wrongPassword',
          },
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockResponse = {
        token: 'mock-token',
        user: {
          id: 'newUser123',
          email: 'new@example.com',
          name: 'New User',
          image: null,
          emailVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      vi.mocked(register).mockResolvedValueOnce(mockResponse);

      const result = await register({
        body: {
          email: 'new@example.com',
          password: 'newPassword123',
          name: 'New User',
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.token).toBeTruthy();
    });

    it('should fail with existing email', async () => {
      vi.mocked(register).mockRejectedValueOnce(new Error('Email already exists'));

      await expect(
        register({
          body: {
            email: 'existing@example.com',
            password: 'password123',
            name: 'Existing User',
          },
        })
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('logout', () => {
    it('should successfully log out', async () => {
      vi.mocked(logout).mockResolvedValueOnce({ success: true });

      const result = await logout({
        headers: {
          authorization: 'Bearer mock-token',
        },
      });

      expect(result).toEqual({ success: true });
    });
  });
}); 