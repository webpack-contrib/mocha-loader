import path from 'path';

export default function readAsset(
  asset,
  { outputFileSystem },
  { compilation: { outputOptions } }
) {
  const { path: outputPath } = outputOptions;
  try {
    return outputFileSystem.readFileSync(path.join(outputPath, asset), 'utf8');
  } catch (error) {
    return error.toString();
  }
}
