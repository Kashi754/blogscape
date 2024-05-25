import { vi } from 'vitest';
import { setupStore } from '../app/Store';
import { addBlogDefaultImg, addDefaultImg } from './addDefaultImage';
import { convertDateToString } from './dateConversions';
import { path } from './footerPath';
import { sanitizeInput } from './sanitizeInput';
import { getFileSize, verifyFileSize, verifyFileType } from './verifyFile';
import { verifyLoggedIn } from './verifyLoggedIn';
import Cookies from 'js-cookie';

describe('FooterPath', () => {
  it('should return a svg path', () => {
    expect(path).toBeDefined();
  });
});

describe('SanitizeInput', () => {
  it('should strip whitespace', () => {
    expect(sanitizeInput('  test  ')).toBe('test');
  });
  it("should remove the following characters ';@$%^&*()[]{}|/'", () => {
    expect(sanitizeInput(';@$%^&*()[]{}|/\\')).toBe('');
  });
  it('should not remove \\ character when second parameter is false', () => {
    expect(sanitizeInput(';@$%^&*()[]{}|/\\', false)).toBe('\\');
  });
  it('remove characters with a numerical value < 32 and 127, mostly control characters while keeping newline characters', () => {
    expect(sanitizeInput('Test\nCase\t')).toBe('Test\nCase');
  });
});

describe('verifyFileType', () => {
  it('should return true if file.type is in fileTypes', () => {
    expect(verifyFileType({ type: 'image/png' })).toBe(true);
  });
  it('should return false if file.type is not in fileTypes', () => {
    expect(verifyFileType({ type: 'video/mp4' })).toBe(false);
  });
});

describe('verifyFileSize', () => {
  it('should return true if file size is less than targetSize', () => {
    expect(verifyFileSize({ size: 250 * 1024 }, 300)).toBe(true);
  });
  it('should return false if file size is greater than targetSize', () => {
    expect(verifyFileSize({ size: 301 * 1024 }, 300)).toBe(false);
  });
  it('should return true if file size is less than 250', () => {
    expect(verifyFileSize({ size: 249 * 1024 })).toBe(true);
  });
  it('should return false if file size is greater than 250', () => {
    expect(verifyFileSize({ size: 251 * 1024 })).toBe(false);
  });
});

describe('getFileSize', () => {
  it('should return file size in bytes', () => {
    expect(getFileSize({ size: 100 })).toBe('100 bytes');
  });
  it('should return file size in KB', () => {
    expect(getFileSize({ size: 1024 })).toBe('1.0 KB');
  });
  it('should return file size in MB', () => {
    expect(getFileSize({ size: 1048576 })).toBe('1.0 MB');
  });
});

describe('addDefaultImg', () => {
  it('should set e.target.src to /images/default.png', () => {
    const e = {
      target: {
        src: '',
      },
    };
    addDefaultImg(e);
    expect(e.target.src).toBe('/images/default.png');
  });
});

describe('addBlogDefaultImg', () => {
  it('should set e.target.src to /images/blog-default-background.webp', () => {
    const e = {
      target: {
        src: '',
      },
    };
    addBlogDefaultImg(e);
    expect(e.target.src).toBe('/images/blog-default-background.webp');
  });
});

describe('convertDateToString', () => {
  it('should convert postgresql timestampz to a string in the format of medium dateStyle and short timeStyle', () => {
    expect(convertDateToString(new Date('2020-01-01T00:00:00.000Z'))).toBe(
      'Dec 31, 2019, 7:00 PM'
    );
  });
});

describe('verifyLoggedIn', () => {
  it('should return userId if authenticated in store', () => {
    const store = setupStore({
      auth: { authenticated: true, expiry: 100000000000000, userId: 1 },
    });
    expect(verifyLoggedIn(store)).toBe(1);
  });
  it('should throw an error if authentication is expired and set authenticated to false', () => {
    const store = setupStore({
      auth: { authenticated: true, expiry: 0, userId: 1 },
    });
    expect(() => verifyLoggedIn(store)).toThrow();
    expect(store.getState().auth.authenticated).toBe(false);
  });
  it('should set authenticated if user cookie exists', () => {
    vi.spyOn(Cookies, 'get').mockReturnValue(
      '{"id":1,"expiry":100000000000000}'
    );
    const store = setupStore({
      auth: { authenticated: false, expiry: 0, userId: 0 },
    });
    verifyLoggedIn(store);
    expect(store.getState().auth.authenticated).toBe(true);
  });
  it('should throw an error if user cookie does not exist', () => {
    vi.spyOn(Cookies, 'get').mockReturnValue(null);
    const store = setupStore({
      auth: { authenticated: false, expiry: 0, userId: 0 },
    });
    expect(() => verifyLoggedIn(store)).toThrow();
    expect(store.getState().auth.authenticated).toBe(false);
  });
});
