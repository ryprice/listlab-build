# listlab-build
Common build tools for public ListLab projects. This package must be locally installed to build other ListLab packages.

## Running your dev environment
```bash
# remember to start the nginx docker container
cd $LISTLAB_REPO_BASE/listlab-www
. tools/start-docker-local.sh
```

Standard build commands:
```bash
npm run start-local      # convenience combine start js and html
npm run start-local-js   # starts local js webpack server
npm run start-local-html # starts local html page server (a simple node script)
npm run start-prod       # like start-local, but hits prod backend
npm run build-prod       # runs a prod build
npm run lint             # lints project
npm run test             # runs unit tests

npm run build-prod   # builds and bundles app for deployment
npm run build-local  # builds and bundles app hitting local endpoints
```

## Setting up a new dev environment
```bash
# Add env variable to .bashrc
echo 'export LISTLAB_REPO_BASE=~/src' >> ~/.bashrc
source ~/.bashrc
mkdir -p $LISTLAB_REPO_BASE
mkdir -p $LISTLAB_REPO_BASE/listlab-secrets

# Clone and prepare listlab-build repo, which has further steps
git clone https://github.com/ryprice/listlab-build.git $LISTLAB_REPO_BASE/listlab-build
cd $LISTLAB_REPO_BASE/listlab-build
npm install
sudo npm link

# Create dev ssl certs and install/trust root cert
cd $LISTLAB_REPO_BASE/listlab-build
. generate-dev-certs.sh
sudo cp $LISTLAB_REPO_BASE/listlab-secrets/ListlabLocalRootCA.crt /usr/local/share/ca-certificates/ListlabLocalRootCA.crt
# Note you may also need to install in browser manually if browser does not use OS cert store
# https://askubuntu.com/questions/1315866
```

Add these lines to `/etc/hosts`.
```
127.0.0.1 local.listlab.io
127.0.0.1 www.local.listlab.io
127.0.0.1 app.local.listlab.io
127.0.0.1 api.local.listlab.io
127.0.0.1 static.local.listlab.io
127.0.0.1 intern.local.listlab.io
# Also duplicate all lines with ::1 on OS X if ther are bonjour issues
```

### Tool installs
```bash
sudo apt update
sudo apt install -y git
sudo apt install -y npm
sudo apt install -y docker.io
sudo usermod -aG docker <username> # restart before using docker
# On ubuntu, you will need to add yourself to the docker group. sudo usermod -aG docker <username>
# MANUALLY INSTALL LATEST NODE. Instructions may differ by OS.
# Ubuntu: https://github.com/nodesource/distributions#installation-instructions
# If apt install nodejs fails, you may need to run:  (replace with archive path in error)
# sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_20.8.0-1nodesource1_amd64.deb
```

### Repos setup
`install-repo.sh` clones and sets up a repo. Run for whichever repos you need.
```bash
. $LISTLAB_REPO_BASE/listlab-build/install-repo.sh listlab-api-js
. $LISTLAB_REPO_BASE/listlab-build/install-repo.sh listlab-appstate
. $LISTLAB_REPO_BASE/listlab-build/install-repo.sh ququmber-ui
. $LISTLAB_REPO_BASE/listlab-build/install-repo.sh listlab-web
. $LISTLAB_REPO_BASE/listlab-build/install-repo.sh listlab-www

# runs npm link in all the repos so their listlab deps symlink to their sibling directories
# you must run this again whenever installing more repos
cd $LISTLAB_REPO_BASE/listlab-build
npx ts-node link-repos.ts
```

### Build some components that are necessary for running services
```bash
# build a docker container that hosts nginx to proxy all local.listlab.io requests to the right place
cd $LISTLAB_REPO_BASE/listlab-www
. tools/build-docker-local.sh
# build listlab-api package (some issue with module resolution makes this necessary)
cd $LISTLAB_REPO_BASE/listlab-api-js
npm run build
```

## Notes for a fresh ubuntu machine
```
su root
sudo usermod -aG sudo vboxuser
#restart
git config --global user.name "Ryan Price"
git config --global user.email "7935599+ryprice@users.noreply.github.com"
```