require('esbuild')
  .build({
    entryPoints: ['./dist/index.js'],
    outfile: './build/binpackr.js',
    bundle: true,
    legalComments: 'none',
  })
  .catch(() => process.exit(1));

require('esbuild')
  .build({
    entryPoints: ['./dist/index.js'],
    outfile: './build/binpackr.min.js',
    bundle: true,
    minify: true,
    legalComments: 'none',
  })
  .catch(() => process.exit(1));
