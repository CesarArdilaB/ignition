import { describe, it, expect, beforeEach, vi } from 'vitest';
import { users, sessions, accounts, verifications } from '../../src/schema';

// Mock the database operations
const mockDb = {
  insert: vi.fn(),
  select: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};

vi.mock('../../src', () => ({
  db: mockDb,
}));

describe('Auth Database Schema', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('Users', () => {
    it('should have correct schema fields', () => {
      expect(users.name).toBeDefined();
      expect(users.email).toBeDefined();
      expect(users.emailVerified).toBeDefined();
      expect(users.image).toBeDefined();
      expect(users.createdAt).toBeDefined();
      expect(users.updatedAt).toBeDefined();
    });

    it('should have correct field constraints', () => {
      expect(users.email.notNull).toBe(true);
      expect(users.name.notNull).toBe(true);
      expect(users.emailVerified.notNull).toBe(true);
      expect(users.emailVerified.default).toBe(false);
    });
  });

  describe('Sessions', () => {
    it('should have correct schema fields', () => {
      expect(sessions.id).toBeDefined();
      expect(sessions.expiresAt).toBeDefined();
      expect(sessions.ipAddress).toBeDefined();
      expect(sessions.userAgent).toBeDefined();
      expect(sessions.userId).toBeDefined();
    });

    it('should have correct field constraints', () => {
      expect(sessions.expiresAt.notNull).toBe(true);
      expect(sessions.userId.notNull).toBe(true);
    });
  });

  describe('Accounts', () => {
    it('should have correct schema fields', () => {
      expect(accounts.id).toBeDefined();
      expect(accounts.accountId).toBeDefined();
      expect(accounts.providerId).toBeDefined();
      expect(accounts.userId).toBeDefined();
      expect(accounts.accessToken).toBeDefined();
      expect(accounts.refreshToken).toBeDefined();
      expect(accounts.idToken).toBeDefined();
      expect(accounts.expiresAt).toBeDefined();
      expect(accounts.password).toBeDefined();
    });

    it('should have correct field constraints', () => {
      expect(accounts.accountId.notNull).toBe(true);
      expect(accounts.providerId.notNull).toBe(true);
      expect(accounts.userId.notNull).toBe(true);
    });
  });

  describe('Verifications', () => {
    it('should have correct schema fields', () => {
      expect(verifications.id).toBeDefined();
      expect(verifications.identifier).toBeDefined();
      expect(verifications.value).toBeDefined();
      expect(verifications.expiresAt).toBeDefined();
    });

    it('should have correct field constraints', () => {
      expect(verifications.identifier.notNull).toBe(true);
      expect(verifications.value.notNull).toBe(true);
      expect(verifications.expiresAt.notNull).toBe(true);
    });
  });
}); 