package frontend

import "embed"

//go:embed dist/bundle.js *.css
var FS embed.FS
