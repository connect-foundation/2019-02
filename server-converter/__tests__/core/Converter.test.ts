import * as Path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import Converter from '../../src/core/Converter';

const tmpFilesPath = Path.resolve(__dirname, '../../tmpFiles');

test('Converter.stop()을 실행하면 컨버팅이 중간에 멈춰야 한다.', async () => {
  const inputPath = Path.join(tmpFilesPath, '__dummy__.pdf');
  const outputPath = tmpFilesPath;
  const outputNaming = (page: number) => `__dummy__${page}`;
  const fourthSlidePath = Path.join(tmpFilesPath, `${outputNaming(4)}.jpg`);
  const converter = new Converter(inputPath, outputPath, outputNaming);

  await converter.init();
  converter.engine.on('progress', ({ page }) => {
    if (page === 2) converter.stop();
  });
  await converter.convert();

  assert.equal(
    fs.existsSync(fourthSlidePath),
    false,
    '네번째 슬라이드 파일이 생성되면 안된다.',
  );
});

test('Converter.clearOutput()을 실행하면 생성된 output 파일들이 모두 제거되야한다.', async () => {
  const inputPath = Path.join(tmpFilesPath, '__dummy__.pdf');
  const outputPath = tmpFilesPath;
  const outputNaming = (page: number) => `__dummy__${page}`;
  const converter = new Converter(inputPath, outputPath, outputNaming);

  await converter.init();
  await converter.convert();
  await converter.clearOutput();

  const outputPaths = [1, 2, 3, 4, 5].map((page) => Path.join(tmpFilesPath, `${outputNaming(page)}.jpg`));
  const isAllOutputRemoved = outputPaths.every((path) => !fs.existsSync(path));

  assert(isAllOutputRemoved, '모든 output 파일들이 제거되야 한다.');
});
