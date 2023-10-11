git clone https://github.com/ryprice/$1.git $LISTLAB_REPO_BASE/$1
cd $LISTLAB_REPO_BASE/$1
npm install --legacy-peer-deps
sudo npm link

