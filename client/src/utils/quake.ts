import range from './range';
import timeout from './timeout';

export default async function quake() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const secondsDuration = 0.1; //seconds
  const times = 3;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const index of range(times)) {
    body.style.animation = `quake ${secondsDuration}s infinite`;
    await timeout(secondsDuration * 1000);
    body.style.animation = '';
  }
}
