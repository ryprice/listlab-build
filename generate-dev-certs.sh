
mkdir -p build/certs
mkdir -p ../listlab-secrets

# Create root CA
openssl req -x509 -nodes -new -sha256 -days 398 -newkey rsa:2048 \
  -keyout build/certs/ListlabLocalRootCA.key \
  -out build/certs/ListlabLocalRootCA.pem \
  -subj "/C=US/CN=Listlab-Local-Root-CA"

openssl x509 -outform pem \
  -in build/certs/ListlabLocalRootCA.pem \
  -out build/certs/ListlabLocalRootCA.crt

# Create cert for local.listlab.io
openssl req -new -nodes -newkey rsa:2048 \
  -keyout build/certs/local.listlab.io.key \
  -out build/certs/local.listlab.io.csr \
  -subj "/C=US/ST=NY/L=NY/O=Listlab-Local/CN=local.listlab.io"

openssl x509 -req -extensions v3_req -sha256 -days 398 \
 -in build/certs/local.listlab.io.csr \
 -CA build/certs/ListlabLocalRootCA.pem \
 -CAkey build/certs/ListlabLocalRootCA.key \
 -CAcreateserial \
 -extfile local.listlab.io.domains.ext \
 -out build/certs/local.listlab.io.crt

# Copy necessary files to listlab-secret
cp build/certs/ListlabLocalRootCA.crt ../listlab-secrets/ListlabLocalRootCA.crt
cp build/certs/local.listlab.io.crt ../listlab-secrets/local.listlab.io.crt
cp build/certs/local.listlab.io.key ../listlab-secrets/local.listlab.io.key