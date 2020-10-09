const listlabPackages = [
  'listlab-api',
  'listlab-web',
  'listlab-service',
  'ququmber-ui',
];

const externalPackages = [
  "axios",
  "d3",
  "express",
  "express-http-proxy",
  "immutable",
  "lodash",
  "qs", 
  "react",
  "react-custom-scrollbars",
  "react-dom",
  "react-dnd",
  "react-dnd-html5-backend",
  "react-linkify",
  "react-live",
  "react-masonry-component",
  "react-tether",
  "react-virtualized",
  "uuid",
];

const sibilingPackages = (packageName) => {
  return listlabPackages.filter(p => p !== packageName);
};

const importOrderConfig = (packageName, additionalExternalPackages = []) => {
  return [
    "error",
    {
      "newlines-between": "ignore",
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "unknown",
        "index"
      ],
      "pathGroupsExcludedImportTypes": [],
      "alphabetize": {order: "asc", caseInsensitive: true},
      "pathGroups": [
        {"pattern": packageName + "/**", "group": "parent"},

        ...sibilingPackages(packageName).map(p => (
          {"pattern": p + "/**", "group": "internal"}
        )),
        ...sibilingPackages(packageName).map(p => (
          {"pattern": p, "group": "internal"}
        )),

        ...externalPackages.concat(additionalExternalPackages).map(p => (
          {"pattern": p, "group": "external"}
        ))
      ]
    }
  ];
};

module.exports = {
  importOrderConfig
};