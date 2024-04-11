import { createHash } from 'crypto';

async function calculateFileHash(url: string) {
  const hash = createHash('sha256');
  const response = await fetch(url);
  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error('Failed to get reader');
  }

  let done, value;
  do {
    ({ done, value } = await reader.read());

    if (value) {
      hash.update(new Uint8Array(value));
    }
  } while (!done);

  return hash.digest('hex');
}

(async () => {
  const url = 'https://www.soumu.go.jp/main_content/000487281.mp4';
  const hash = await calculateFileHash(url);
  console.log(`Hash: ${hash}`);
})();
