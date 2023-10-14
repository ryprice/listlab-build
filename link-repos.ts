import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

interface PackageMap {
  [packageName: string]: string;
}

const packages: PackageMap = {
  'listlab-build': 'listlab-build',
  'listlab-api': 'listlab-api-js',
  'listlab-appstate': 'listlab-appstate',
  'ququmber-ui': 'ququmber-ui',
  'listlab-web': 'listlab-web',
  'listlab-www': 'listlab-www',
  'listlab-chrome': 'listlab-chrome',
  'listlab-mobile': 'listlab-mobile',
  'listlab-service': 'listlab-service',
};

async function linkPackages() {
  // Link each package to its dependencies that are in the list
  for (const packageA in packages) {
    const packageDirA = packages[packageA];
    const packageJsonPath = join(process.env.LISTLAB_REPO_BASE || '', packageDirA, 'package.json');
    if (!existsSync(packageJsonPath)) {
      continue;
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const deps = Object.keys(packageJson.dependencies || {});
    const peerDeps = Object.keys(packageJson.peerDependencies || {});
    const devDeps = Object.keys(packageJson.devDependencies || {});
    const dependencies = [...deps, ...peerDeps, ...devDeps];

    for (const dependency of dependencies) {
      if (dependency in packages && dependency !== packageA) {
        console.log(`package ${packageA}: npm link ${dependency}`);
        await execAsync(`cd $LISTLAB_REPO_BASE/${packageDirA} && npm link ${dependency}`);
      }
    }
  }
}

linkPackages().catch(error => {
console.error('Error linking packages:', error);
});
