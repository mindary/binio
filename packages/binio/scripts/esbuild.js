require('esbuild')
  .build({
    entryPoints: ['./dist/index.js'],
    outfile: './build/binio.js',
    external: ['buffer'],
    bundle: true,
    legalComments: 'none',
  })
  .catch(() => process.exit(1));

require('esbuild')
  .build({
    entryPoints: ['./dist/index.js'],
    outfile: './build/binio.min.js',
    external: ['buffer'],
    bundle: true,
    minify: true,
    legalComments: 'none',
  })
  .catch(() => process.exit(1));
