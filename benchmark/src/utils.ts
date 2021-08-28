import os from 'os';
import toSource from 'tosource';

export async function tryImport(name: string) {
  try {
    const mod = await import(name);
    return mod.default ?? mod;
  } catch (e: any) {
    if (/Cannot find module/.test(e.message)) {
      return;
    }
    console.error(e);
    // ignore
  }
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function log(
  text?: string,
  options?: {
    header?: string;
    footer?: string;
    width?: number;
    indent?: string | number;
  },
) {
  text = text ?? ' ';
  // eslint-disable-next-line prefer-const
  let {header, footer, width, indent} = options ?? {};
  indent = typeof indent === 'number' ? repeat(' ', indent) : indent ?? '';
  width = width ?? text.length;
  let s = '';
  if (header) {
    s += indent;
    let i = 0;
    while (i < width) {
      s += header;
      i += header.length;
    }
    s += '\n';
  }

  s += indent + text;
  if (footer) {
    s += '\n' + indent;
    let i = 0;
    while (i < width) {
      s += footer;
      i += footer.length;
    }
  }
  console.log(s);
}

export function repeat(str: string, n: number) {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += str;
  }
  return result;
}

export function osinfo() {
  return `${process.title}/${process.version}; ${os.type()}; ${os.cpus()[0].model}`;
}

export function inspect(target: unknown) {
  return toSource(target, a => a, '');
}
