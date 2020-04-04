const listlabPackages = [
  'listlab-api',
  'listlab-web',
  'ququmber-ui'
];

const sibilingPackages = (packageName) => {
  return listlabPackages.filter(p => p !== packageName);
};

const importOrderConfig = (packageName) => {
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

        {"pattern": "axios", "group": "external"},
        {"pattern": "d3", "group": "external"},
        {"pattern": "immutable", "group": "external"},
        {"pattern": "lodash", "group": "external"},
        {"pattern": "qs", "group": "external"},
        {"pattern": "react", "group": "external"},
        {"pattern": "react-custom-scrollbars", "group": "external"},
        {"pattern": "react-dom", "group": "external"},
        {"pattern": "react-dnd", "group": "external"},
        {"pattern": "react-dnd-html5-backend", "group": "external"},
        {"pattern": "react-linkify", "group": "external"},
        {"pattern": "react-live", "group": "external"},
        {"pattern": "react-masonry-component", "group": "external"},
        {"pattern": "react-tether", "group": "external"},
        {"pattern": "react-virtualized", "group": "external"},
      ]
    }
  ];
};

module.exports = {
  importOrderConfig
};