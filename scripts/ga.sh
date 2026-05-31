#!/bin/bash

read -p "Run Biome format before git add? (y/n): " answer

if [[ "$answer" =~ ^[Yy]$ ]]; then
  pnpm biome check src --write
fi

git add .