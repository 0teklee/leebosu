# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # no color

# logging functions
sep()     { echo -e "${BLUE}────────────────────────────────────────${NC}"; }
info()    { echo -e "${YELLOW}▶ $*${NC}"; }
success() { echo -e "${GREEN}✔︎ $*${NC}"; }
failure() { echo "::error::$*"; exit 1; }
