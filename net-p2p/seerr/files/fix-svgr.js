const fs = require('fs');
const p = process.argv[2];
let s = fs.readFileSync(p, 'utf8');
const anchor = 'const nextConfig: NextConfig = {';
if (!s.includes(anchor)) { console.error('SVGR patch: anchor not found in ' + p); process.exit(1); }
const inject = `
  webpack(config) {
    const r = config.module.rules.find((x) => x.test && x.test.test && x.test.test('.svg'));
    if (r) {
      config.module.rules.push(
        { ...r, test: /\\.svg$/i, resourceQuery: /url/ },
        { test: /\\.svg$/i, issuer: r.issuer, resourceQuery: { not: [...((r.resourceQuery && r.resourceQuery.not) || []), /url/] }, use: ['@svgr/webpack'] }
      );
      r.exclude = /\\.svg$/i;
    } else {
      config.module.rules.push({ test: /\\.svg$/i, issuer: /\\.[jt]sx?$/, use: ['@svgr/webpack'] });
    }
    return config;
  },`;
fs.writeFileSync(p, s.replace(anchor, anchor + inject));
console.log('SVGR webpack rule injected into ' + p);
