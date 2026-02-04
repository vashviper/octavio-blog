#!/bin/bash

# O.C.T.A.V.I.O. Blog - Verification Script
# This script verifies all required files are present

echo "🐙 O.C.T.A.V.I.O. Blog - Project Verification"
echo "============================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project directory?${NC}"
    exit 1
fi

# Array of required files
required_files=(
    "package.json"
    "tsconfig.json"
    "tailwind.config.ts"
    "next.config.mjs"
    "postcss.config.mjs"
    ".eslintrc.json"
    ".gitignore"
    "README.md"
    "DEPLOYMENT.md"
    "PROJECT_SUMMARY.md"
    "SITE_METADATA.md"
    ".env.example"
    "app/layout.tsx"
    "app/page.tsx"
    "app/globals.css"
    "app/not-found.tsx"
    "app/blog/[slug]/page.tsx"
    "components/Navigation.tsx"
    "components/Hero.tsx"
    "components/BlogSection.tsx"
    "components/BlogCard.tsx"
    "components/AboutSection.tsx"
    "components/ProjectsSection.tsx"
    "components/ContactSection.tsx"
    "components/Footer.tsx"
    "lib/blog-data.ts"
    "lib/utils.ts"
    "public/robots.txt"
)

# Check each file
missing_files=0
present_files=0

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
        ((present_files++))
    else
        echo -e "${RED}❌ $file - MISSING${NC}"
        ((missing_files++))
    fi
done

echo ""
echo "============================================"
echo "Summary:"
echo "- Present: $present_files files"
echo "- Missing: $missing_files files"
echo ""

if [ $missing_files -eq 0 ]; then
    echo -e "${GREEN}✨ All files verified! Project is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Install dependencies: npm install"
    echo "2. Run dev server: npm run dev"
    echo "3. Open browser: http://localhost:3000"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some files are missing. Please check the output above.${NC}"
    exit 1
fi
