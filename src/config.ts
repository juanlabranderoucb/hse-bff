import { join } from 'path';

type TPackageJson = { name: string; version: string };

export const config = async () => {
  const locatePackagejson = process.cwd();

  let pm2 = false;
  if (locatePackagejson.includes('dist')) {
    pm2 = true;
  }

  const packageJsonPath: string = join(
    process.cwd(),
    pm2 ? '../package.json' : 'package.json',
  );

  const packageJson: TPackageJson = (await import(
    packageJsonPath
  )) as TPackageJson;

  return {
    name: packageJson.name,
    version: packageJson.version,
  };
};
