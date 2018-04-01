interface CacheItem {
  url: string;
  revision?: string;
}

let __precacheManifest: CacheItem[];

function addIndexRevision(urls: string[], defRev?: string) {
  const rando = (Math.random() * 1000000).toPrecision(6);
  const indices = __precacheManifest.filter(m => m.url === '/index.html');
  const revision = indices.length === 1 ? indices[0].revision : defRev || rando;
  return urls.map(url => {
    return { url, revision };
  });
}

describe('addIndexRevision', () => {
  describe('index in precache', () => {
    beforeEach(() => {
      __precacheManifest = [
        { url: '/scripts/app.123.js' },
        { revision: 'good rev', url: '/index.html' },
        { url: '/css/app.123.css' },
      ];
    });
    it('index found 0', () => {
      expect(addIndexRevision([], 'asdf')).toEqual([]);
    });
    it('index found 1', () => {
      expect(addIndexRevision(['/manifest.json'], 'asdf')).toEqual([
        { revision: 'good rev', url: '/manifest.json' },
      ]);
    });
    it('index found 2', () => {
      expect(addIndexRevision(['/', '/manifest.json'], 'asdf')).toEqual([
        { revision: 'good rev', url: '/' },
        { revision: 'good rev', url: '/manifest.json' },
      ]);
    });
  });

  describe('index not in precache', () => {
    beforeEach(() => {
      __precacheManifest = [
        { url: '/scripts/app.123.js' },
        { revision: 'good rev', url: '/not-index.html' },
        { url: '/css/app.123.css' },
      ];
    });
    it('index found 1', () => {
      expect(addIndexRevision(['/manifest.json'], 'asdf')).toEqual([
        { revision: 'asdf', url: '/manifest.json' },
      ]);
    });
    it('index found 2', () => {
      expect(addIndexRevision(['/', '/manifest.json'], 'asdf')).toEqual([
        { revision: 'asdf', url: '/' },
        { revision: 'asdf', url: '/manifest.json' },
      ]);
    });
    it('no default', () => {
      expect(
        addIndexRevision(['a', 'b', 'c', 'd'], undefined).every(
          f => !!f.revision && f.revision.length === 6
        )
      ).toBeTruthy();
    });
  });

  describe('empty precache', () => {
    beforeEach(() => {
      __precacheManifest = [];
    });
    it('index found 1', () => {
      expect(addIndexRevision(['/manifest.json'], 'asdf')).toEqual([
        { revision: 'asdf', url: '/manifest.json' },
      ]);
    });
    it('index found 2', () => {
      expect(addIndexRevision(['/', '/manifest.json'], 'asdf')).toEqual([
        { revision: 'asdf', url: '/' },
        { revision: 'asdf', url: '/manifest.json' },
      ]);
    });
  });
});
